<template>
      <v-container fluid>
        <v-btn depressed dark flat icon large @click="$emit('exit')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout align-center justify-center>
          <v-flex xs5>
            <v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Edit checkpoint</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-form class="inputs">
                  <v-text-field class="fieldDimensions" color="green" v-model="name" prepend-icon="note" name="title" label="Title" type="text"></v-text-field>
                    <q-select
                        :dark="true"
                        class="fieldDimensions"
                        v-model="usersSelected"
                        float-label="Usuarios asignados"
                        color ="green"
                        multiple
                        :options="allUsers"
                        />
                </v-form>
                </v-layout>
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
    props: ['checkpoint'],
    data: function () {
        return {
            name: this.checkpoint.name,
            users: [],
            usersSelected: []
        }
    },
    created: function(){
        this.users = this.project.users
        for(let user of this.checkpoint.users) {
            this.usersSelected.push(user.id)
        }
        this.name = this.checkpoint.name
    },
    computed: {
        ...mapState(['host']),
        ...mapState('project', ['project']),
        ...mapState('tasks', ['names', 'selectedTask']),
        allUsers() {
            let computedUsers = []
            for(let user of this.project.users) {
                computedUsers.push({label: user.username, value: user.id})
            }

            return computedUsers
        }
    },
    methods: {
        ...mapMutations('tasks', ['addTask']),
        send: async function() {
            let response = await this.$axios.post(this.host+'tasks/checkpoints/update', {
                id: this.checkpoint.id,
                name: this.name,
            })

            let checkpoint = response.data
            let found = false
            let to_add = []
            let to_delete = []

            for (let user of this.checkpoint.users) {
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
                for (let user of this.checkpoint.users) {
                    if (userid == user.id) {
                        found = true
                    }
                }

                if(!found) {
                    to_add.push(userid)
                }
            }
            
            for(let userid of to_add) {
                let response = await this.$axios.post(this.host+'tasks/checkpoints/assign_user', {
                    checkpoint_id: this.checkpoint.id,
                    user_id: userid
                })
            }

            for (let user of to_delete) {
                let response = await this.$axios.post(this.host+'tasks/checkpoints/unassign_user', {
                    checkpoint_id: this.checkpoint.id,
                    user_id: user.id
                })
            }

            let users = []
            for(let user of this.checkpoint.users){
                let valid = true
                for (let userRemove of to_delete){
                    if (user.id == userRemove.id) {
                        valid = false
                    }
                }
                if(valid) {
                    users.push(user)
                }
            }

            for(let user of this.project.users) {
                for(let userid of to_add) {
                    if(userid == user.id) {
                        users.push(user)
                        break
                    }
                }
            }

            this.checkpoint.name = this.name
            this.checkpoint.users = users
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
