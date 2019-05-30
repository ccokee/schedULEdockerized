<template>
      <v-container>
        <v-btn depressed dark flat icon large @click="$emit('exit')">
        <v-icon size="40">close</v-icon></v-btn>

        <v-layout align-center justify-center>
          <v-flex xs5>
            <v-card dark raised max-width="30vw">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <span class="tituloToolbar">Create task</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                        <img src="statics/favicon.png"
                        class="logoAuth"
                    />
                </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-form class="inputs">
        <v-text-field class="campos" color="green" v-model="name" prepend-icon="file" label="Task name" :rules="[() => !!name || 'This field is required']" ></v-text-field>
        <v-text-field class="campos" color="green" v-model="weight" prepend-icon="fa-weight" label="Weight" type="number"></v-text-field>

        <v-textarea
          class="campos"
          name="taskDescription"
          label="Task description"
          color="green"
          value=""
          height="100px"
          v-model="description"
          :rules="[() => !!description || 'This field is required']"
        ></v-textarea>
        <q-select
            :dark="true"
            class="campos"
            v-model="status"
            float-label="¿Columna inicial?"
            color ="green"
            radio
            :options="names"
            />
        <q-select
            :dark="true"
            class="campos"
            v-model="usersSelected"
            float-label="Usuarios asignados"
            color ="green"
            multiple
            :options="projectUsers"
            />
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
            status: null,
            description: '',
            weight: 0,
            users: [],
            usersSelected: []
        }
    },
    created: function(){
        this.users = this.project.users
    },
    computed: {
        ...mapState(['host','projectId']),
        ...mapState('tasks', ['names']),
        ...mapState('project',['project']),
        projectUsers() {
            let computedUsers = []
            for(let user of this.users) {
                computedUsers.push({label: user.username, value: {id: user.id, username: user.username}})
            }

            return computedUsers
        }

    },
    methods: {
        ...mapMutations('tasks', ['addTask']),
        send: async function() {
            if (!this.name || !this.status) {
                this.$q.notify({
                    message: 'Completa los campos de nombre y estado',
                    color: 'red',
                    position: 'top'
                })
                return
            }
            let response = await this.$axios.post(this.host+'tasks/add', {
                name: this.name,
                status: this.status,
                description: this.description,
                weight: this.weight,
                projectid: this.projectId
            })


            let task = response.data
            task.users = []
            task.labels = []
            for(let userid of this.usersSelected) {
                let response = await this.$axios.post(this.host+'tasks/assign_user', {
                    task_id: task.id,
                    user_id: userid.id
                })

                for(let user of this.project.users) {
                    if(userid.id == user.id) {
                        task.users.push(user)
                    }
                }
            }

            this.addTask(task)
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
