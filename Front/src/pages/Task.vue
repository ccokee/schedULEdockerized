<template>
      <v-container>
        <v-btn depressed dark flat icon large  @click="$router.push('/dashboard')" v-bind:class="{'blurred': addCheckpoint || addLabel || updateTask || updateCheckpoint }">
            <v-icon size="40">close</v-icon>
        </v-btn>
        <div class="notBlurred" v-if="addCheckpoint">
            <create-checkpoint v-on:exit="addCheckpoint = false"/>
        </div>

        <div class="notBlurred" v-if="addLabel">
            <add-label :id="idToLabel" :type="typeToLabel" v-on:exit="addLabel = false"/>
        </div>

        <div class="notBlurred" v-if="updateTask">
            <update-task v-on:exit="updateTask = false"/>
        </div>

        <div class="notBlurred" v-if="updateCheckpoint">
            <update-checkpoint :checkpoint="selectedCheckpoint" v-on:exit="updateCheckpoint = false"/>
        </div>

        <v-layout dark v-bind:class="{ 'notBlurred': !addCheckpoint && !addLabel && !updateTask && !updateCheckpoint, 'blurred': addCheckpoint || addLabel || updateTask || updateCheckpoint}">
          <v-flex dark justify-center align-center >
            <v-card dark raised min-width="50vw" max-width="60vw" >
                <v-toolbar dark>
                    <v-toolbar-title>
                        <div style="display: flex; flex-direction: row; margin-top: 1%">
                            <v-text-field v-if="editingTitle" class="editTitleField" color="green" v-model="name" solo name="title" label="Task name" type="text" @keyup.enter="editingTitle=false"></v-text-field>
                            <span v-if="!editingTitle" class="tituloToolbar">Task: {{ name.toUpperCase() }}</span>
                            <v-btn style="width: 10px; height: 1px;" depressed icon @click="editingTitle = !editingTitle">
                                <v-icon v-if="!editingTitle" size="12">edit</v-icon>
                                <v-icon v-else size="12">cancel</v-icon>
                            </v-btn>
                            <v-btn style="width: 10px; height: 1px;" v-if="editingTitle" depressed icon @click="send(); editingTitle=false">
                                <v-icon size="12">done</v-icon>
                            </v-btn>
                        </div>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="../statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>

              <v-card-text>
                    <v-flex shrink row wrap>    
                            <v-flex d-flex xs12 md6 shrink>
                                <v-flex shrink column mr-1 style="min-height: 0px">
                                    <p class="tituloDialog">Description</p>
                                    <v-textarea
                                        class="dataText"
                                        outline
                                        color="green"
                                        v-model="description"
                                        @focusout="send"
                                    ></v-textarea>
                                </v-flex>
                            </v-flex>
                            <v-flex column ml-1 style="min-height: 0px">
                                <p class="tituloDialog">Data</p>
                                <span class="dataLabel">Asignees</span>
                                <div class="lista-etiquetas text-xs-center">
                                <overlaped-avatars></overlaped-avatars>
                                </div>
                                <q-select
                                :dark="false"
                                v-model="usersSelected"
                                float-label="Añadir usuario"
                                chips
                                color ="green"
                                multiple
                                :options="projectUsers"
                                />
                                <br>
                                <div style="display: flex; flex-direction: row; margin-bottom: 1vh">
                                    <span class="dataLabel" style="width:10%">Status: </span>
                                    <span class="dataText-weight"> {{computedStatus}}</span>
                                </div>
                                <div style="display: flex; flex-direction: row; height: 4vh">
                                <span v-if="!editingWeight" class="dataLabel">Expected weight:</span>
                                <span v-if="!editingWeight" class="dataText-weight"> {{selectedTask.weight}}</span>
                                <v-btn class="edit-button" depressed icon @click="editingWeight = !editingWeight">
                                    <v-icon v-if="!editingWeight" size="12">edit</v-icon>
                                    <v-icon v-else size="12">cancel</v-icon>
                                </v-btn>
                                <v-text-field v-if="editingWeight"
                                class="campos-task-weight" 
                                color="green" 
                                v-model="weight" 
                                prepend-icon="fa-weight" 
                                type="number"
                                @keyup.enter="(weight!=selectedTask.weight)? send : editingWeight=false"
                                ></v-text-field>
                                 <v-btn class="edit-button" depressed icon v-if="editingWeight" @click="send(); editingWeight=false">
                                    <v-icon v-if="editingWeight" size="12">done</v-icon>
                                </v-btn>
                                </div>

                                <div style="display: flex; flex-direction: row">
                                    <span v-if="!editingRealWeight" class="dataLabel" style="width: 16%">Final weight:</span>
                                    <span v-if="!editingRealWeight" class="dataText-weight" style="width: 18%"> {{computedRealWeight}}</span>
                                    <v-btn class="edit-button" depressed icon @click="editingRealWeight = !editingRealWeight">
                                        <v-icon v-if="!editingRealWeight" size="12">edit</v-icon>
                                        <v-icon v-else size="12">cancel</v-icon>
                                    </v-btn>
                                    <v-text-field v-if="editingRealWeight" 
                                    class="campos-task-weight" 
                                    color="green" 
                                    v-model="realWeight" 
                                    prepend-icon="fa-weight" 
                                    label="Real weight" 
                                    type="number"
                                    @keyup.enter="(realWeight!=selectedTask.realWeight) ? send : editingRealWeight=false"
                                    ></v-text-field>
                                    <v-btn class="edit-button" depressed icon v-if="editingRealWeight" @click="send(); editingRealWeight = false">
                                    <v-icon v-if="editingRealWeight" size="12">done</v-icon>
                                </v-btn>
                                </div>
                            </v-flex>

                            <v-flex shrink d-flex xs12 md6 style="margin-top:2%">
                                <v-flex mr-1>
                                <span class="tituloDialog">Checkpoint list</span><br>
                                <checklist class="checklist" v-on:deletelabel="deleteLabel($event)" v-on:updatecheck="triggerUpdateCheckpoint($event)" v-on:label="addLabelToCheck($event)"/><br>
                                <v-btn small color="green" @click="addCheckpoint=true">Add checkpoint</v-btn>
                                </v-flex>
                            </v-flex>

                            <v-flex shrink d-flex md6 style="margin-top:2%">
                                    <span class="tituloDialog">Labels</span>
                                    <v-btn class="addLabelButton" icon fab color="green" @click="addLabelToTask"
                                    ><v-icon size="14">add</v-icon>
                                    </v-btn>
                                    <q-scroll-area class ="scroll-area-labels">
                                    <div class="lista-etiquetas text-xs-center">
                                        <v-chip small v-for="label in selectedTask.labels" :key="label.id" close 
                                        @input="deleteLabelTask(label)">
                                        {{label.name}}
                                        </v-chip>
                                        
                                    </div>
                                    </q-scroll-area>    
                                    
                                </v-flex>                         
                    </v-flex>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="deleteTask" color="red">Delete</v-btn>
                <v-btn flat @click="$router.push('/dashboard')">Back</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import checklist from '../components/checklist'
import updateTask from '../components/updateTask'
import createCheckpoint from '../components/addCheckpoint'
import overlapedAvatars from '../components/overlapedAvatars'
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VFlex from 'vuetify/lib/components/VGrid/VFlex'
import VCard from 'vuetify/lib/components/VCard'
import VChip from 'vuetify/lib/components/VChip'
import VBtn from 'vuetify/lib/components/VBtn'
import VIcon from 'vuetify/lib/components/VIcon'
import VForm from 'vuetify/lib/components/VForm'
import VeeValidate from 'vee-validate'
import addLabel from '../components/addLabel'
import updateCheckpoint from '../components/updateCheckpoint'
import 'vuetify/dist/vuetify.min.css'

//<overLapedAvatars v-bind:users="selectedTask.asignees" /><v-btn icon depressed dark><v-icon size="50">add</v-icon></v-btn>

export default {
    components: {
        checklist,
        createCheckpoint,
        overlapedAvatars,
        addLabel,
        updateTask,
        updateCheckpoint
    },
    data: function () {
        return {
            addCheckpoint: false,
            addLabel: false,
            idToLabel: null,
            typeToLabel: null,
            usersSelected: [],
            updateTask: false,
            updateCheckpoint: false,
            selectedCheckpoint: null,
            name: '',
            status: '',
            description: '',
            weight: 0,
            realWeight: 0,
            editingTitle: false,
            editingStatus: false,
            editingDescription: false,
            editingWeight: false,
            editingRealWeight: false
        }
    },
    created: function() {
        if (!this.selectedTask) {
            this.$router.push('/dashboard')
        }
        
        for (let user of this.selectedTask.users) {
            this.usersSelected.push(user.id)
        }
        this.name = this.selectedTask.name
        this.description = this.selectedTask.description
        this.weight = this.selectedTask.weight
        this.realWeight = this.selectedTask.realWeight
    },
    watch: {
        usersSelected: function() {
            this.updateMembers()
        }
    },
    methods: {
        ...mapActions('tasks', ['loadChecklist']),
        ...mapMutations('tasks', ['setSelectedTask', 'updateDataTask', 'removeTask']),
        triggerUpdateCheckpoint(checkpoint) {
            this.selectedCheckpoint = checkpoint
            this.updateCheckpoint = true
        },
        deleteTask() {
            this.$q.dialog({
                title: 'Borrar tarea',
                message: '¿Estás seguro de que deseas borrar la tarea?',
                color: 'green',
                ok: true,
                cancel: true,
                preventClose: true,
                noBackdropDismiss: false, 
                noEscDismiss: false,
                position: 'top',
            })
            .then(() => {
                this.$axios.post('http://process.env.PROXY_HOST_PORT/tasks/delete', {id: this.selectedTask.id})
                this.removeTask(this.selectedTask)
                this.$router.push('/dashboard')
            })
            .catch(() => {})
           
        },
        addLabelToTask() {
            this.idToLabel = this.selectedTask.id
            this.typeToLabel = 'task'
            this.addLabel = true
        },
        addLabelToCheck(id) {
            this.idToLabel = id
            this.typeToLabel = 'checkpoint'
            this.addLabel = true 
        },
        updateMembers: async function() {
            let found = false
            let to_add = []
            let to_delete = []

            for (let user of this.selectedTask.users) {
                found = false
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
                found = false
                for (let user of this.selectedTask.users) {
                    if (userid == user.id) {
                        found = true
                    }
                }

                if(!found) {
                    to_add.push(userid)
                }
            }
            
            for(let user of to_add) {
                let response = await this.$axios.post(this.host+'tasks/assign_user', {
                    task_id: this.selectedTask.id,
                    user_id: user
                })
            }

            for (let user of to_delete) {
                let response = await this.$axios.post(this.host+'tasks/unassign_user', {
                    task_id: this.selectedTask.id,
                    user_id: user.id
                })
            }
        },
        send: async function() {
            let response = await this.$axios.post(this.host+'tasks/update', {
                id: this.selectedTask.id,
                name: this.name,
                description: this.description,
                weight: this.weight,
                real_weight: this.realWeight,
                projectid: this.projectId
            })

            let newSelectedTask = this.selectedTask
            newSelectedTask.name = this.name
            newSelectedTask.description = this.description
            newSelectedTask.weight = this.weight
            newSelectedTask.real_weight = this.realWeight

            this.updateDataTask(newSelectedTask)
            this.setSelectedTask(newSelectedTask)
            this.$q.notify({
                message: 'Tarea actualizada correctamente',
                color: 'green',
                position: 'top'
            })
        },
        deleteLabelTask: function(label) {
            this.selectedTask.labels.splice(this.selectedTask.labels.indexOf(label), 1)
            this.deleteLabel(label.id)
        },
        deleteLabel: function(labelid) {
            this.$axios.post(this.host+'labels/delete', {
                id: labelid
            }).then(() => {
                return true
            })
            .catch(err => {
                return false
            })
        }
    },
    computed: {
        ...mapState('tasks', ['selectedTask']),
        ...mapState('project', ['project']),
        ...mapState(['host']),
        computedStatus()  {
            let conversion = {
                'open' : 'Pendiente',
                'closed' : 'Cerrrada',
                'inprogress' : 'En progreso',
                'testing' : 'En testeo'
            }

            return conversion[this.selectedTask.status].toUpperCase()
        },
        projectUsers() {
            let computedUsers = []
            if (this.project) {
                for(let user of this.project.users) {
                    computedUsers.push({label: user.username, value: user.id})
                }
            }
            
            return computedUsers
        },
        computedRealWeight () {
            return this.selectedTask.real_weight ? this.selectedTask.real_weight : 'Sin definir'.toUpperCase()
        },
    }
}
</script>

<style lang="sass">
@import '../styles/baseDesing'

.add-label
    width: 10vw

.scroll-area-labels
    height: 25vh
    width: 100%

.labels-flex
    display: flex
    flex-direction: row

.titulo-etiqueta
    margin-bottom: 0.5vh
    margin-left: 0.5vh
    margin-top: 0.5vh

.lista-etiquetas
    display: flex
    flex-direction: row
    flex-wrap: wrap

.lista-etiquetas-item
    display: flex
    flex-direction: row
    background-color: grey
    margin-top: 0vh

.blurred
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    filter: blur(5px)
    z-index: -1
    opacity: 0.25


.notBlurred
    position: relative


.tituloToolbar
    font-weight: bold
    color: lightGray
    font-size: 12pt

.tituloDialog
    font-weight: bold
    color: white
    font-size: 11pt

.dataLabel
    width: 22%
    font-weight: normal
    color: LightGray
    font-size: 10pt

.dataText
    font-weight: normal
    color: white
    width: 95%
    font-size: 11pt

.dataText-weight
    font-weight: bold
    color: white
    width: 4%
    font-size: 11pt

.addLabelButton
    max-width: 16px
    max-height: 16px
    margin-right: 0vh

.checklist
    width: 23vw

.edit-button
    width: 20px
    height: 20px
    margin-top: 1px

.campos-task-weight
    width: 5%
    height: 2%
    padding-top: 0px
    margin-top: 0px
</style>
