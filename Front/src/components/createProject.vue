<template>
      <v-container>
        <v-btn depressed dark flat icon large @click.stop="$emit('exit')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout align-center justify-center>
          <v-flex xs5>
            <v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Create project</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>
              <v-card-text>
                  <v-text-field class="fieldDimensionsCreate" color="green" v-model="name" prepend-icon="fa-file" name="title" label="Title" type="text"/>
                    <q-select
                        :dark="true"
                        class="fieldDimensionsCreate"
                        v-model="usersSelected"
                        float-label="Asignees"
                        color ="green"
                        multiple
                        :options="allUsers"
                        />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
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
        })
    },
    computed: {
        ...mapState(['host', 'username', 'projectId']),
        ...mapState('tasks', ['names']),
        allUsers() {
            let computedUsers = []
            for(let user of this.users) {
                computedUsers.push({label: user.username, value: {id: user.id, username: user.username}})
            }

            return computedUsers
        }
    },
    methods: {
        ...mapMutations('tasks', ['addTask']),
        ...mapMutations(['addProject', 'setProjectId']),
        send: async function() {
            let myself = false
            let response = await this.$axios.post(this.host + 'projects/add', {
                name: this.name
            })

            let project = response.data
            for(let userid of this.usersSelected) {
                let response = await this.$axios.post(this.host+'projects/assign_user', {
                    projectid: project.id,
                    userid: userid.id
                })

                if (userid.username == this.username) {
                    myself = true
                }
            }
            
            project = await this.$axios.get(this.host +'projects/' + project.id)

            if (myself) {
                this.addProject(project.data)

                if(this.projectId == null) {
                    this.setProjectId(project.data.id)
                    this.$emit('refresh')
                }
            }

            this.$emit('exit')
        }
    }
}
</script>

<style lang="sass">

.fieldDimensionsCreate
    max-width: 30vw
    width: 25vw
    font-weight: normal
    font-size: 10pt

</style>
