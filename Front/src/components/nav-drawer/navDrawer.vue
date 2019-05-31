<template>
  <v-navigation-drawer
      v-model="nDrawer"
      class="navDrawer"
      app
      clipped
      dark
      permanent
      floating
      :width=250
      :mini-variant-width=80
      :mini-variant.sync="$vuetify.breakpoint.smAndDown || miniv"
      >
        <addIcon v-if="miniv || $vuetify.breakpoint.smAndDown" v-on:addTaskAddIcon="$emit('addtask')"/>
        <expandIcon v-bind:minified="miniv" v-if="$vuetify.breakpoint.mdAndUp" v-on:addTaskExpand="$emit('addtask')" v-on:peque="miniv ? miniv=false : miniv=true" />
        <span v-if="!miniv && $vuetify.breakpoint.mdAndUp && project" class="activeProjectText"> 
          {{project.name}}
        </span>
        <v-btn class="projectAddButton" depressed icon v-if="isAdmin && !miniv && $vuetify.breakpoint.mdAndUp" @click="$emit('addproject')">
          <v-icon size="12">add</v-icon>
        </v-btn>

        <v-btn class="teamEditButton" depressed icon v-if="isAdmin && !miniv && $vuetify.breakpoint.mdAndUp" @click="$emit('editproject')">
          <v-icon size="12">edit</v-icon>
        </v-btn>
        <active-project-icon v-bind:minified="miniv" v-on:uploadavatar="editAvatar = !editAvatar"/>
        <q-uploader class="upload-avatar" v-if="editAvatar" dark :url="process.env.PROXY_HOST_PORT + '/users/upload'" :headers="{'Authorization': 'Bearer ' + token}"/>
        <v-divider/>
        <active-project-label-list v-on:refresh="$emit('refresh')" v-if="!miniv && $vuetify.breakpoint.mdAndUp"/>
        <v-divider class="separator"/>
        <div class="teamMembersDiv">
        <p v-if="!miniv && $vuetify.breakpoint.mdAndUp" class="teamText">Team
          <v-btn class="teamAddButton" depressed icon v-if="isAdmin" @click="$emit('editproject')">
            <v-icon size="12">add</v-icon>
          </v-btn>
        </p>
        <active-project-team-members/>
        </div>
  </v-navigation-drawer>
</template>

<script>
    import VContainer from 'vuetify/lib/components/VGrid/VContainer'
    import VLayout from 'vuetify/lib/components/VGrid/VLayout'
    import VFlex from 'vuetify/lib/components/VGrid/VFlex'
    import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer';
    import VToolbar from 'vuetify/lib/components/VToolbar';
    import * as VList from 'vuetify/lib/components/VList';
    import VIcon from 'vuetify/lib/components/VIcon';
    import VBtn from 'vuetify/lib/components/VBtn';
    import expandIcon from './vuetify/expandIcon';
    import activeProjectIcon from './vuetify/activeProjectIcon'
    import activeProjectLabelList from './vuetify/activeProjectLabelList'
    import activeProjectTeamMembers from './vuetify/activeProjectTeamMembers'
    import addIcon from './vuetify/addIcon'
    import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

    export default {
      name: 'navDrawer',
      components: {
        VNavigationDrawer,
        VToolbar,
        VList,
        activeProjectIcon,
        expandIcon,
        addIcon,
        activeProjectLabelList,
        activeProjectTeamMembers,
      },
      data: function() {
        return {
          miniv: false,
          nDrawer: true,
          editAvatar: false
        }
      },
      watch: {
        editAvatar: async function() {
          if (this.editAvatar == false) {
            let url = await this.$axios.get(process.env.PROXY_HOST_PORT  + '/users/avatar/' + this.username)
            this.setAvatar(url.data)
          }
        }
      },
      computed: {
        ...mapState('project', ['project']),
        ...mapState(['isAdmin', 'username', 'token'])
      },
      methods :{
        ...mapMutations(['setAvatar']),
        addNewTask() {
          this.$emit(addTask, true);
        }
      } 
    }
</script>

<style lang="sass">

@import '../../styles/baseDesing.scss';
@import '../../styles/variables/nav-drawer.scss';

.navDrawer
  overflow: hidden
  height: 40px

.separator
  margin-top: 15px
.teamText
  margin-top: 10px
  margin-left: 15px

.upload-avatar
  margin-left: 5%
  margin-right: 5%
  margin-bottom: 5%

.activeProjectText
  margin-top: 0px
  margin-left: 15px

.teamAddButton
    max-width: 16px
    max-height: 16px
    margin-left: 2px
    font-weight: bold

.teamEditButton
    max-width: 16px
    max-height: 16px
    font-weight: bold

  
.projectAddButton
    max-width: 16px
    max-height: 16px
    margin-left: 5.5vw
    font-weight: bold


.teamMembersDiv
    overflow: scroll
    overflow-y: hidden
    overflow-x: hidden

.activeIconRollover
    background: #44815c
    height: 80px

.activeIconRollover:hover
  background-size: 100%
  transition: background 0s


</style>
