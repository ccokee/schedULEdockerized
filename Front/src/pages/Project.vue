<template>
      <v-container fluid>
        <v-btn depressed dark flat icon large @click="$router.push('/dashboard')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout align-center justify-center>
          <v-flex xs5>
            <v-card v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Add project</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-form class="inputs">
                  <v-text-field class="fieldDimensions" color="green" v-model="name" prepend-icon="note" name="projectName" label="Project name" type="text"></v-text-field>
                  <v-text-field class="fieldDimensions" color="green" v-model="NewTeamMembers" prepend-icon="fa-address-card" name="teamMembers" label="Member to add" type="text">
                            <template v-slot:selection="{ item, index }">
                                <v-chip v-if="index === 0">
                                   <span>{{ item }}</span>
                                </v-chip>
                                <span
                                    v-if="index === 1"
                                    class="grey--text caption"
                                >(+{{ value.length - 1 }} others)</span>
                            </template>
                    </v-text-field>
                    <v-text-field class="fieldDimensions" color="green" v-model="projectAvatarUrl" prepend-icon="fa-address-card" name="projectAvatarUri" label="Team avatar URL" type="text">
                    </v-text-field>
                </v-form>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$router.push('/dashboard')">Back</v-btn>
                <v-btn flat color="green" @click="send">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import checklist from '../components/checklist'
import createCheckpoint from '../components/addCheckpoint'
import overlapedAvatars from '../components/overlapedAvatars'
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VFlex from 'vuetify/lib/components/VGrid/VFlex'
import VCard from 'vuetify/lib/components/VCard'
import VBtn from 'vuetify/lib/components/VBtn'
import VIcon from 'vuetify/lib/components/VIcon'
import VForm from 'vuetify/lib/components/VForm'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.min.css'

export default {
    components: {

    },
    data: function () {
        return {
            name: '',
            status: null,
            description: '',
            weight: 0
        }
    },
    computed: {
        ...mapState(['host']),
        ...mapState('projects', ['names'])
    },
    methods: {
        ...mapMutations('projects', ['addProject']),
        send: async function() {
            let response = await this.$axios.post(this.host+'projects/add', {
                name: this.name,
                TeamMembers: []
            })
            this.addProject(response.data)
            this.$emit('exit')
        }
    }
}
</script>

<style lang="sass">

.create-task-big
    background-color: black
    width: 100%
    height: 80%
    margin-left: 0
    text-align: center
    display: flex
    flex-direction: column
    opacity: 1
    z-index: 6000

.btn-add-task
    margin-left: 2vw
    margin-top: 5vh

.input-add-task
    margin-left: 25%
    width: 50%
    z-index: 6000

.buttons
    margin-left: 38vw
    display: flex
    flex-direction: row

.title
  font-size: 10vw
  color: white
</style>