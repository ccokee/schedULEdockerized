<template>
<v-layout id="backGround" align-center justify-center>
    <v-layout align-center justify-center class="notBlurredd" v-if="addTask">
        <create-task v-on:exit="addTask = false"/>
    </v-layout>

    <v-layout align-center justify-center class="notBlurredd" v-if="editProject">
        <update-project v-on:exit="editProject = false"/>
    </v-layout>

    <v-layout align-center justify-center class="notBlurredd" v-if="addProject">
        <create-project v-on:exit="addProject = false"/>
    </v-layout>


    <v-app dark v-bind:class="{ 'notBlurredd': !addTask && !editProject && !addProject, 'blurredd': addTask || editProject || addProject }">
        <div class="userMenu" v-if="showUserMenu">
            <user-menu v-on:exit="showUserMenu = false"/>
        </div>
        <toolbar v-on:refresh="loadData()" v-on:addtask="addTask = true"/>
        <nav-drawer v-on:refresh="loadData()" v-on:editproject="editProject = true" v-on:addtask="addTask = true"  v-on:addproject="addProject = true"/>
        <v-content style="width:100vw">
            <filter-toolbar/>
            <tasks/>
        </v-content>
    </v-app>
</v-layout>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import tasks from '../components/tasks'
import filterToolbar from '../components/filterToolbar'
import createTask from '../components/createTask'
import navDrawer from '../components/nav-drawer/navDrawer'
import toolbar from '../components/toolbar/toolbar'
import VToolbar from 'vuetify/lib/components/VToolbar'
import VImg from 'vuetify/lib/components/VImg'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VContent from 'vuetify/lib/components/VGrid/VContent'
import userMenu from '../components/dialogs/user-menu/userMenu.vue'
import createProject from '../components/createProject'
import updateProject from '../components/updateProject'

export default {
    components: {
        tasks,
        userMenu,
        createTask,
        navDrawer,
        toolbar,
        createProject,
        updateProject,
        filterToolbar
    },
    data: function () {
        return {
            addTask: false,
            showUserMenu: false,
            editProject: false,
            addProject: false
        }
    },
    computed: {
        ...mapState(['token', 'projectId']),
        ...mapState('project', ['project'])
    },
    created: function () {
        if (!this.token) {
            this.$q.notify({
                message: 'Sesión expirada',
                color: 'red',
                position: 'top'
            })
            this.$router.push('/')
        }

        if (!this.project) {
            this.loadData()
        }
    },
    methods: {
        ...mapMutations('tasks', ['setTasks']),
        ...mapMutations('project', ['setProject']),
        loadData() {
            if (this.projectId) { 
                this.$axios.get('http://process.env.PROXY_HOST_PORT/projects/' + this.projectId)
                    .then(response => {
                        this.setTasks(response.data.tasks)
                        this.setProject(response.data)
                        this.$q.notify({
                            message: 'Datos actualizados',
                            color: 'main',
                            position: 'top'
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        this.$router.push('/')
                    })
            }
        }
    }
}
</script>

<style lang="sass">
@import '../styles/baseDesing.scss'


.blurredd
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    filter: blur(5px)
    z-index: -1
    opacity: 0.25

.notBlurredd
    position: relative
    opacity: 1

.temp
    width: 20%
    height: 90vh
    background-color: red

.background
    position: absolute
    width: 100vw
    height: 100vh
    margin: 0px
    padding: 0px
    background-color: black
    opacity: 0.95
    z-index: 1000

.logo
    margin-top: 1vh
    margin-left: 0vw
    width: auto
    height: 8vh
    min-height: 40px

.add-task
    width: 40px
    height: 40px
    margin-top: 1%
    float: right

</style>
