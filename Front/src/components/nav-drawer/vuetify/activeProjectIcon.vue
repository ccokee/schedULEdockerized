<template>
      <v-list subheader two-line avatar pl-0 ml-0 >
        <v-list-tile>
          <v-list-tile-avatar size="50">
            <img v-if="avatar" :src="avatar">
            <img v-else src="statics/avatarTeam.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
                <span class="projectText"> {{username}} </span>
                <v-btn class="addLabelButton" depressed dark fab small icon @click.stop="updateAvatar()" >
                  <v-icon v-if="!editAvatar" size=14>backup</v-icon>
                  <v-icon v-if="editAvatar" size=14>done</v-icon>
                </v-btn>
            </v-list-tile-title>
            <v-list-tile-sub-title>
                <span class="completedText">Completado: {{total}}%</span>
                </v-list-tile-sub-title>
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
    import { mapActions, mapGetters, mapState } from 'vuex';

    export default {
        name: 'activeProjectIcon',
        data: () => ({
          editAvatar: false,
        }),
        computed: {
          ...mapState(['username', 'avatar']),
          ...mapState('tasks', ['open', 'closed', 'inprogress', 'testing']),
          total: function () {
            if ((this.open.length + this.closed.length + this.inprogress.length + this.testing.length) == 0) {
              return 100
            }
            else {
              let value =  this.closed.length * 100 / (this.open.length + this.closed.length + this.inprogress.length + this.testing.length)
              return Math.round(value * 100) / 100
            }
          }
        },
        props: {
            minified: null, 
        },
        methods: {
          updateAvatar() {
            this.editAvatar = !this.editAvatar
            this.$emit('uploadavatar')
          }
        }
    }

</script>

<style lang="sass">

@import '../../../styles/baseDesing.scss';

.projectText
    font-size: 9pt

.completedText
    font-size: 8pt

.tilealigntostart
    margin-left: 0px
</style>
