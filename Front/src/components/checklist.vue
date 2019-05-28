<template>
    <v-layout align-center justify-center>
        <q-scroll-area class="scroll-checkpoint">
                <v-card flat v-for="check in selectedTask.checkpoints" :key="check.id" dark>
                    <v-layout fill-height>
                        <v-flex xs1 align-center>
                            <v-checkbox color="green" v-model="check.status" @click.stop="update(check)"></v-checkbox>
                        </v-flex>
                        <v-flex xs11>
                            <v-card-title>
                            <div>
                                <span class="title-checkpoint">{{check.name.toUpperCase()}}</span>
                                <div>
                                    <v-chip small v-for="user in check.users" :key="user.id"> 
                                        <v-avatar>
                                            <img v-if="user.avatar" :src="user.avatar">
                                            <img v-else src="https://randomuser.me/api/portraits/men/35.jpg">
                                        </v-avatar>
                                        {{user.username}}
                                    </v-chip>
                                </div>
                                <q-scroll-area class="scroll-area-label">
                                    <div class="lista-etiquetas">
                                        <v-chip small v-for="label in check.labels" :key="label.id" close 
                                        @input="deleteLabel(label, check)">{{label.name}}</v-chip>
                                    </div>
                                </q-scroll-area>
                            </div>
                            </v-card-title>
                        </v-flex>
                    <v-card-actions> 
                    <v-btn depressed fab hover="f" flat icon color="red" class="check-card-actions" @click="deleteCheck(check)"><v-icon size="14">cancel</v-icon></v-btn>
                    <v-btn depressed fab hover="f" flat icon color="green" class="check-card-actions" @click="$emit('label', check.id)"><v-icon size="14">add</v-icon></v-btn>
                    <v-btn depressed fab flat icon color="green" class="check-card-actions" @click="$emit('updatecheck', check)"><v-icon size="14">fa-edit</v-icon></v-btn>
                    </v-card-actions>
                    </v-layout>
                    </v-card>
        </q-scroll-area>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VFlex from 'vuetify/lib/components/VGrid/VFlex'
import VToolbar from 'vuetify/lib/components/VToolbar'
import VCard from 'vuetify/lib/components/VCard'
import VForm from 'vuetify/lib/components/VForm'
import VIcon from 'vuetify/lib/components/VIcon'
import VSelect from 'vuetify/lib/components/VSelect'
import VChip from 'vuetify/lib/components/VChip'
import VAvatar from 'vuetify/lib/components/VAvatar'
import VCheckbox from 'vuetify/lib/components/VCheckbox'

export default {
    name: 'checklist',
    data: function () {
        return {

        }
    },
    computed:{
        ...mapState('tasks', ['selectedTask'])
    },
    methods: {
        update(checkpoint) {
            checkpoint.status = !checkpoint.status
            this.$axios.post('http://process.env.PROXY_HOST_PORT/tasks/checkpoints/update', checkpoint)
        },
        deleteLabel(label, check) {
            check.labels.splice(check.labels.indexOf(label), 1)
            this.$emit('deletelabel', label.id)
        },
        deleteCheck(check) {
            this.$q.dialog({
                title: 'Borrar checkpoint',
                message: '¿Estás seguro de que deseas borrar el checkpoint?',
                color: 'green',
                ok: true,
                cancel: true,
                preventClose: true,
                noBackdropDismiss: false, 
                noEscDismiss: false,
                position: 'top',
            })
            .then(() => {
                this.$axios.post('http://process.env.PROXY_HOST_PORT/tasks/checkpoints/delete', {id: check.id})
                this.selectedTask.checkpoints.splice(this.selectedTask.checkpoints.indexOf(check), 1)
            })
            .catch(() => {})

        }
    }
}
</script>

<style lang="sass">
@import '../styles/baseDesing'


.card-checkpoint
    background-color: #303030;

.big-title
    display: flex
    direction: row
    width: 100%

.title-checkpoint
    margin-top: 0vh
    margin-right: 0
    font-size: 9pt

.scroll-checkpoint
    height: 25vh
    width: 35vw

.tileChekpoint:hover
  background-size: 150%;
  transition: background 0s;

.check-card-actions
    width: 18px
    height: 18px

</style>
