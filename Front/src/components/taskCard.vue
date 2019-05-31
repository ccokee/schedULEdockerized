<template>
    <v-card dark ripple raised hover @click="goToTask" class="taskCard">
        <v-card-title>
            <span class="taskTitle">{{task.name.toUpperCase()}}</span>
        </v-card-title>

        <q-scroll-area class="scroll-area-label">
            <div class="lista-etiquetas">
                <v-chip class="chip" v-for="label in task.labels" :key="label.id">{{label.name}}</v-chip>
            </div>
        </q-scroll-area>
        
        <v-spacer></v-spacer>
        <v-layout>
            <div>
                <v-btn class="buttonDescription" icon @click.stop="showDescription = !showDescription">
                <v-icon size="12">{{showDescription ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                </v-btn>
            </div>
        </v-layout>
        <v-spacer></v-spacer>

        <v-layout v-if ="showDescription">
            <v-card-text v-show="showDescription">
                <div class="textDescription"> {{task.description}} </div>
            </v-card-text>
        </v-layout>
 
    </v-card>

</template>


<script>
import { mapMutations } from 'vuex';
import VCard from 'vuetify/lib/components/VCard'
import VBtn from 'vuetify/lib/components/VBtn'
import VIcon from 'vuetify/lib/components/VIcon'

export default {
    props: ['task'],
    data: function () {
        return {
            showDescription: false
        }
    },
    methods : {
        ...mapMutations('tasks', ['setSelectedTask']),
        goToTask () {
            this.$axios.get(process.env.PROXY_HOST_PORT + '/tasks/' + this.task.id)
            .then(response => {
                this.setSelectedTask(response.data)
                this.$router.push('/task')
            })
            .catch(err => {
                console.log(err)
            })
        }

    }
}
</script>

<style lang="sass">
@import '../styles/baseDesing'

.taskCard
    min-height: 15vh
    max-height: 30vh
    min-width: 90%
    margin-left: auto
    margin-right: auto

.taskTitle
    font-size: 10pt
    font-weight: bold
    font-family: Roboto
    margin-top: 0vh
    color: white

.taskText
    font-size: 10pt
    font-family: Roboto
    color: white

.editButton
    max-width: 24px
    max-height: 24px

.lista-etiquetas
    width: 13vw
    display: flex
    flex-direction: row
    flex-wrap: wrap

.scroll-area-label
    margin-left: 5%
    width: 16vw
    height: 7.5vh

.labels-flex
    height: 10px
    display: flex
    flex-direction: row

.chip 
    height: 10pt

.no-shrink
    flex-shrink: 0

.buttonDescription
    max-width: 16px
    max-height: 16px

.textDescription
    font-size: 10pt
    font-family: Roboto
    color: white
</style>
