<template>
      <v-container>
        <v-btn depressed dark flat icon large @click="$emit('exit')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout justify-center>
          <v-flex xs5>
            <v-card v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Actualizar tarea</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-form class="inputs">
        <v-text-field class="campos" color="green" v-model="name" prepend-icon="note" name="title" label="Task name" type="text"></v-text-field>
        <v-text-field class="campos" color="green" v-model="weight" prepend-icon="note" name="title" label="Weight" type="number"></v-text-field>
        <v-text-field class="campos" color="green" v-model="realWeight" prepend-icon="note" name="title" label="Real weight" type="number"></v-text-field>

        <v-textarea
          class="campos"
          name="taskDescription"
          label="Task description"
          color="green"
          value=""
          height="100px"
          v-model="description"
        ></v-textarea>
        </v-form>
    </v-layout></v-card-text>
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

export default {
    data: function () {
        return {
            name: '',
            status: '',
            description: '',
            weight: 0,
            realWeight: 0,
        }
    },
    computed: {
        ...mapState(['host','projectId']),
        ...mapState('tasks', ['selectedTask']),
        ...mapState('project',['project']),
    },
    created: function (){
        this.name = this.selectedTask.name
        this.status = this.selectedTask.status
        this.description = this.selectedTask.description
        if(this.selectedTask.weight) {
            this.weight = this.selectedTask.weight
        }
        if (this.selectedTask.realWeight){
            this.realWeight = this.selectedTask.realWeight
        }
    },
    methods: {
        ...mapMutations('tasks', ['setSelectedTask', 'updateDataTask']),
        send: async function() {
            if(!this.name) {
                this.$q.notify({
                    message: 'El nombre no puede estar vacio',
                    color: 'red',
                    position: 'top'
                })  
                return
            }

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

            this.setSelectedTask(newSelectedTask)
            this.updateDataTask(newSelectedTask)
            this.$emit('exit')
        }
    }
}
</script>

<style lang="sass">
.campos
    max-width: 30vw
    width: 25vw
    font-weight: normal
    font-size: 10pt

.buttons
    margin-left: 38vw
    display: flex
    flex-direction: row

.title
  font-size: 10vw
  color: white
</style>
