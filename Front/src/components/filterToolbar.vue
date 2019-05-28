<template>
  <v-layout row style="float: right; margin-right: 5%">
    <div>
    <q-select
        :dark="true"
        v-model="usersSelected"
        float-label="filter users"
        color="#ADFF2F"
        multiple
        chips
        chips-color="white"
        chips-bg-color="green"
        style="width: 12vw"
        :options="allUsers"
    />
    </div>
    <div style="margin-left: 1%">
    <q-select
        :dark="true"
        v-model="labelsSelected"
        float-label="filter labels"
        color="#ADFF2F"
        multiple
        chips
        chips-color="white"
        chips-bg-color="green"
        style="width: 12vw"
        :options="projectLabels"
    />
    </div>

    <div class="text-xs-center" style="margin-top: 20px">
      <v-btn
        small
        flat
        v-if="labelsSelected.length != 0"
        color="green"
        dark
        @click="cleanFilterLabels"
      >
        Reset labels
      </v-btn>
    </div>
    
    </v-layout>
</template>

<script>
import VFlex from 'vuetify/lib/components/VGrid/VFlex'
import VCheckbox  from 'vuetify/lib/components/VCheckbox'
import VIcon from 'vuetify/lib/components/VIcon'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default {
    name: 'filterToolbar',
    data: function() {
        return {
            innerChecked: false,
            usersSelected: [],
            labelsSelected: []        
        }
    },
    created: function (){
        this.labelsSelected = this.filterLabels
        this.usersSelected = this.filterUsers
    },
    watch: {
        filterLabels: function() {
            this.labelsSelected = this.filterLabels
        },
        usersSelected: function() {
            this.usersSelected = this.filterUsers
        },
        usersSelected: function(newUsers, old) {
            if (old.length != newUsers.length) {
                let toChange = old.filter(user => newUsers.indexOf(user) == -1)
                if (toChange.length == 0) {
                    let toChange = newUsers.filter(user => old.indexOf(user) == -1)
                    this.addFilterUsers(toChange[0])
                }
                else{
                    this.removeFilterUsers(toChange[0])
                }    
                this.filter()
            }
        },
        labelsSelected: function(newLabels, old) {
            if (old.length != newLabels.length) {
                let toChange = old.filter(user => newLabels.indexOf(user) == -1)
                if (toChange.length == 0) {
                    let toChange = newLabels.filter(user => old.indexOf(user) == -1)
                    this.addFilterLabel(toChange[0])
                }
                else{
                    this.removeFilterLabel(toChange[0])
                }
                this.filter()
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['loadChecklist','filter']),
        ...mapMutations('tasks', ['addFilterLabel','addFilterUsers','removeFilterLabel','removeFilterUsers', 'cleanFilterLabels'])
    },
    computed: {
        ...mapState('project', ['project']),
        ...mapState('tasks', ['all', 'filterLabels', 'filterUsers']),
        projectLabels() {
            let labels = []
            for (let task of this.all) {
                for(let label of task.labels) {
                    if (!labels.includes(label.name)) {
                        labels.push(label.name)
                    }
                }
            }
            let data = []
            for(let item of labels) {
                data.push({label: item, value: item.toLowerCase()})
            }
            return data
        },
        allUsers() {
            let users = []
            if (this.project) {
                for(let user of this.project.users) {
                    if (!users.includes(user.username)) {
                        users.push(user.username)
                    }
                }
            }

            let data = []

            for(let item of users) {
                data.push({label: item, value: item.toLowerCase()})
            }

            return data

        }
    }

}

</script>

<style>



</style>