<template>
      <v-container fluid>
        <v-btn depressed dark flat icon large @click="$emit('exit')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout align-center justify-center>
          <v-flex xs5>
            <v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Add checkpoint</span>
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
    data: function () {
        return {
            name: '',
            status: false,
            users: [],
            usersSelected: []
        }
    },
    created: function(){
        this.users = this.project.users
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
            let response = await this.$axios.post(this.host+'tasks/checkpoints/add', {
                taskid: this.selectedTask.id,
                name: this.name,
                status: this.status
            })

            let checkpoint = response.data
            for(let userid of this.usersSelected) {
                let response = await this.$axios.post(this.host+'tasks/checkpoints/assign_user', {
                    checkpoint_id: checkpoint.id,
                    user_id: userid
                })
            }

            checkpoint.users = []
            checkpoint.labels = []
            for(let userid of this.usersSelected) {
                for(let candidate of this.project.users) {
                    if (userid === candidate.id) {
                        checkpoint.users.push(candidate)
                    }
                }
            }
            this.selectedTask.checkpoints.push(checkpoint)
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
