<template>
    <v-container align-center justify-center class="column-container">
     <v-flex v-if="$vuetify.breakpoint.mdAndUp" md12 align-center justify-center>
    
     <div class="column-scroll">     
       <v-toolbar dark fluid height="40">
         <v-toolbar-title>
           <span class="tbTitle">OPEN</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn class="countButton" small fab color="#22603d">{{ open.length }}</v-btn></v-toolbar>
        <q-scroll-area class ="scroll-area">
            <draggable class="column" id="open" ghost-class="ghost" v-model="open" v-bind="dragOptions" @start="drag=true" @end="drag=false">
              <taskCard class="list-item" v-for="task in open" :key="task.id" :task="task"/>
            </draggable>
        </q-scroll-area>

      </div> 

     <div class="column-scroll">     
       <v-toolbar dark fluid height="40">
         <v-toolbar-title>
           <span class="tbTitle">IN PROGRESS</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn class="countButton" small fab color="#22603d">{{ inprogress.length }}</v-btn></v-toolbar>
        <q-scroll-area class ="scroll-area">
            <draggable class="column" ghost-class="ghost" id="inprogress" v-model="inprogress" v-bind="dragOptions" @start="drag=true" @end="drag=false">
            <taskCard class="list-item" v-for="task in inprogress" :key="task.id" :task="task"/>
            </draggable>
        </q-scroll-area>
      </div>  

     <div class="column-scroll">     
       <v-toolbar dark fluid height="40">
         <v-toolbar-title>
           <span class="tbTitle">TESTING</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn class="countButton" small fab color="#22603d">{{ testing.length }}</v-btn></v-toolbar>
        <q-scroll-area class ="scroll-area">
            <draggable class="column" ghost-class="ghost" id="testing" v-model="testing" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                <taskCard class="list-item" v-for="task in testing" :key="task.id" :task="task"/>
            </draggable>
        </q-scroll-area>
      </div>  

     <div class="column-scroll">     
       <v-toolbar dark fluid height="40">
         <v-toolbar-title>
           <span class="tbTitle">CLOSED</span>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn class="countButton" small fab color="#22603d">{{ closed.length }}</v-btn></v-toolbar>
        <q-scroll-area class ="scroll-area">
            <draggable class="column" ghost-class="ghost" id="closed" v-model="closed" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                <taskCard class="list-item" v-for="task in closed" :key="task.id" :task="task"/>
            </draggable>
        </q-scroll-area>
      </div>
   
    </v-flex>
    <v-layout v-if="$vuetify.breakpoint.smAndDown" align-center justify-center>
    <v-tabs style="width: 70vw" v-model="active" grow dark slider-color="#44815c">
     <v-tab v-for="(column, index) in names" :key="index" :href="'#tab-' + column.value">
         {{ column.label }}
     </v-tab>
    <v-tabs-items v-model="active">
        <v-tab-item :value="'tab-open'">
            <div class ="column-scrolli">
                <taskCard class="list-item" v-for="task in open" :key="task.id" :task="task"/>
            </div>
        </v-tab-item>
        
        <v-tab-item :value="'tab-inprogress'"> 
            <div class ="column-scrolli">
                <taskCard class="list-item" v-for="task in inprogress" :key="task.id" :task="task"/>
            </div>
        </v-tab-item>

        <v-tab-item :value="'tab-testing'">
            <div class ="column-scrolli">
                <taskCard class="list-item" v-for="task in testing" :key="task.id" :task="task" />
            </div>
        </v-tab-item>

        <v-tab-item :value="'tab-closed'">
            <div class ="column-scrolli">
                <taskCard class="list-item" v-for="task in closed" :key="task.id" :task="task"/>
            </div>
        </v-tab-item>
    </v-tabs-items>
    </v-tabs>
    </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import taskCard from './taskCard'
import draggable from 'vuedraggable'
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VToolbar from 'vuetify/lib/components/VToolbar'
import VTabs from 'vuetify/lib/components/VTabs'
import VCard from 'vuetify/lib/components/VCard'
import VBtn from 'vuetify/lib/components/VBtn'
import VIcon from 'vuetify/lib/components/VIcon'

export default {
    components: {
        taskCard,
        draggable
    },
    data: function () {
        return {
            active: 'tab-open',
            editable: true
        }
    },
    computed: {
        ...mapState('tasks', ['names']),
        open: {
            get() {
                return this.$store.state.tasks.open
            },
            set(value) {
                this.setOpen(value)
            }
        },
        closed: {
            get() {
                return this.$store.state.tasks.closed
            },
            set(value) {
                this.setClosed(value)
            }
        },
        inprogress: {
            get() {
                return this.$store.state.tasks.inprogress
            },
            set(value) {
                this.setInprogress(value)
            }
        },
        testing: {
            get() {
                return this.$store.state.tasks.testing
            },
            set(value) {
                this.setTesting(value)
            }
        },
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            }
        }
    },
    methods: {
        next () {
            const active = parseInt(this.active)
            this.active = (active < 2 ? active + 1 : 0)
        },
        prev () {
            const active = parseInt(this.active)
            this.active = (active > 1 ? active - 1 : 0)
        },
        ...mapMutations('tasks', ['setOpen', 'setClosed', 'setInprogress', 'setTesting', 'setSelectedTask'])
    }
}
</script>

<style lang="sass">
@import '../styles/baseDesing'

.main
  background-color: $bg-color

.title-column
    text-align: center
    color: white
    font-size: 1.5vw
    width: 15.4vw

.column-container
    display: flex
    direction: row
    oveflow: auto
    margin: 0 auto

.scroll-area
    height: 70vh

.ghost
  opacity: 0.5

.list-item 
  cursor: pointer
  margin: 0.5vw
  margin-left: 0.25vw
  width: 14.5vw

.list-item:hover
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

.column
    min-height: 60vh

.column-scroll
    text-align: center
    background-color: dark-grey
    width: 15vw
    height: 75vh
    margin-left: 1vw

.countButton
    max-width: 24px
    max-height: 24px

.tbTitle
    font-size: 10pt
    font-weight: bold

.tabButons
    direction: row

</style>
