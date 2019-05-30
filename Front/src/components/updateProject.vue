<template>
      <v-container>
        <v-btn depressed dark flat icon large @click="$emit('exit')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout align-center justify-center>
          <v-flex xs5>
            <v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Editar proyecto</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>
              <v-card-text>
                  <v-text-field class="fieldDimensions" color="green" v-model="name" prepend-icon="note" name="title" label="Title" type="text"/>
                    <q-select
                        :dark="true"
                        class="fieldDimensions"
                        v-model="usersSelected"
                        float-label="Usuarios asignados"
                        color ="green"
                        multiple
                        chips
                        :options="allUsers"
                        />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$emit('exit')">Back</v-btn>
                <v-btn flat color="green" @click="send">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VFlex from 'vuetify/lib/components/VGrid/VFlex'
import VToolbar from 'vuetify/lib/components/VToolbar'
import VCard from 'vuetify/lib/components/VCard'
import VForm from 'vuetify/lib/components/VForm'
import VIcon from 'vuetify/lib/components/VIcon'
import VSelect from 'vuetify/lib/components/VSelect'
import VChip from 'vuetify/lib/components/VChip'
import VeeValidate from 'vee-validate'

export default {
    data: function () {
        return {
            name: '',
            users: [],
            usersSelected: []
        }
    },
    created: function (){
        this.$axios.get(process.env.PROXY_HOST_PORT + '/users/list')
        .then(response => {
            this.users = response.data
             for(let user of this.users) {
                for(let projectUser of this.project.users) {
                    if (projectUser.id === user.id) {
                        this.usersSelected.push(user.id)
                    }
                }
            }
        })

        this.name = this.project.name
    },
    computed: {
        ...mapState(['host', 'username']),
        ...mapState('tasks', ['names']),
        ...mapState('project', ['project']),
        allUsers() {
            let computedUsers = []
            for(let user of this.users) {
                computedUsers.push({label: user.username, value: user.id})
            }

            return computedUsers
        }
    },
    methods: {
        ...mapMutations('tasks', ['addTask']),
        ...mapMutations('project', ['setProject']),
        ...mapMutations(['setProjectId']),
        send: async function() {
            let myself = false
            let response = await this.$axios.post(this.host + 'projects/update', {
                id: this.project.id,
                name: this.name
            })

            let project = response.data
            let found = false
            let to_add = []
            let to_delete = []

            for (let user of this.project.users) {
                let found = false
                for (let userid of this.usersSelected) {
                    if (userid == user.id) {
                        found = true
                    }
                }

                if(!found) {
                    to_delete.push(user)
                }
            }
            
            for (let userid of this.usersSelected) {
                let found = false
                for (let user of this.project.users) {
                    if (userid == user.id) {
                        found = true
                    }
                }

                if(!found) {
                    to_add.push(userid)
                }
            }
            
            for(let user of to_add) {
                let response = await this.$axios.post(this.host+'projects/assign_user', {
                    projectid: project.id,
                    userid: user
                })
            }

            for (let user of to_delete) {
                let response = await this.$axios.post(this.host+'projects/unassign_user', {
                    projectid: project.id,
                    userid: user.id
                })
            }

            let final = await this.$axios.get(this.host + 'projects/' + project.id)
            this.setProject(final.data)
            this.$emit('exit')
        }
    }
}
</script>

<style lang="sass">

.fieldDimensions
    max-width: 30vw
    width: 25vw
    font-weight: normal
    font-size: 10pt

</style>
