<template>
  <q-layout class="main" view="lHh Lpr lFf">
    <q-page-container>
      <div class="form-empty" v-if="!createProject">
        <p class="title-create">You aren't assignated to a project yet</p>
        <q-btn class="send" v-if="isAdmin" color="main" icon-right="send" @click="createProject = true">Create project</q-btn>
        <q-btn class="send" color="grey" icon-right="reply_all" @click="$router.push('/')">Log out</q-btn>
      </div>
      <div v-else>
          <create-project class="create-project" v-on:exit="createProject = false"/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import createProject from '../components/createProject'

export default {
  components: {
      createProject
  },
  data: function () {
    return {
      createProject: false
    }
  },
  watch: {
      projectId : function(old, newProject) {
          this.$router.push('/dashboard')
      }
  },
  computed: {
      ...mapState(['projectId', 'isAdmin'])
  },
}
</script>

<style lang="sass">
@import '../styles/baseDesing'

.main
  background-color: $bg-color

.form-empty
  padding-top: 30vh
  width: 100vw
  height: 100vh
  text-align: center
  color: white
  font-family: Roboto

.inputs-empy
  padding-top: 7vh
  display: flex
  width: 40vw
  flex-direction: column
  text-align: center
  margin-left: 30vw
  color: white

.send
  margin-top: 7vh
  margin-right: 2vw

.title-create
  font-family: 'Roboto', Helvetica, sans-serif;
  font-size: 3vw
  text-align: left
  width: 100%
  text-align: center
    
</style>
