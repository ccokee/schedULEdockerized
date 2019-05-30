<template>
      <v-list subheader avatar pt-0 mt-0>
        <v-list-tile class="teamTileComponent" v-for="user in otherMembers" :key="user.id">
          <v-list-tile-avatar size="40">
              <v-img v-if="user.avatar" :src="user.avatar"/>
              <v-img v-else src="statics/avatar.jpg"></v-img>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="teamTileTitle">{{ user.username }}
                <v-icon class="margin-left-icon" v-if="user.isAdmin" size=14>gavel</v-icon>
                <v-btn class="margin-bottom-button" v-if="isAdmin" depressed dark fab small icon @click.stop="toggleAdmin(user)" >
                  <v-icon v-if="!user.isAdmin" size=14>trending_up</v-icon>
                  <v-icon v-if="user.isAdmin" size=14>trending_down</v-icon>
                </v-btn>
            </v-list-tile-title>

          </v-list-tile-content>
        </v-list-tile>
      </v-list>
</template>

<script>
    import VLayout from 'vuetify/lib/components/VGrid/VLayout'
    import * as VList from 'vuetify/lib/components/VList'
    import VBtn from 'vuetify/lib/components/VBtn'
    import VIcon from 'vuetify/lib/components/VIcon'
    import VAvatar from 'vuetify/lib/components/VAvatar'
    import VImg from 'vuetify/lib/components/VImg'
    import { mapActions, mapGetters, mapState } from 'vuex';
    

    export default {
        name: 'activeProjectTeamMembers',
        data: function () {
            return {
                users: [],
                usersSelected: []
            }
        },
        watch: {
            project: function() {
                this.users = this.project.users
            }
        },
        computed: {
            ...mapState('project', ['project']),
            ...mapState(['email', 'isAdmin']),
            ...mapState('tasks', ['open', 'closed', 'inprogress', 'testing']),
            otherMembers() {
                if (this.project) {
                    return this.project.users.filter(user => user.email != this.email)
                }else{
                    return []
                }
            },
            projectUsers() {
                let computedUsers = []
                for(let user of this.users) {
                    computedUsers.push({label: user.username, value: {id: user.id, username: user.username}})
                }
                return computedUsers
            }
        },
        methods: {
            toggleAdmin: async function(user) {
                let response = this.$axios.post(process.env.PROXY_HOST_PORT + '/users/togglestatus', {id: user.id})
                user.isAdmin = !user.isAdmin
            }
        }
    }

</script>

<style lang="sass">

@import '../../../styles/baseDesing.scss';

.margin-left-icon
    margin-left: 5%
    margin-bottom: 3%

.margin-bottom-button
    padding-bottom: 2vh
    max-width: 16px
    max-height: 16px

.labelNumber
    max-width: 24px
    max-height: 24px
    font-size: 8pt

.teamTileComponent
    max-height: 10vh

.teamTileComponent:hover
  background-color: #303030;
  background-size: 100%;
  transition: background 0s;

.teamTileTitle
    font-family: 'Roboto', Helvetica, sans-serif;
    font-size: 12pt
    font-weight: normal
    color: #c0c0c0
</style>