<template>
      <v-list dense subheader>
        <v-list-tile class="tileAddButton">
        <v-list-tile-content>Otros proyectos</v-list-tile-content>
        </v-list-tile>

        <v-list-tile class="tileComponent" v-for="project in otherProjects" :key="project.id" ripple>
          <v-list-tile-content >
            <v-list-tile-title class="tileTitle"> {{ project.name }} </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn class="labelNumber" color="#a0a0a0" flat small fab @click.stop="change(project.id)" >
               VER
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
</template>

<script>
    import VLayout from 'vuetify/lib/components/VGrid/VLayout'
    import * as VList from 'vuetify/lib/components/VList'
    import VBtn from 'vuetify/lib/components/VBtn'
    import VIcon from 'vuetify/lib/components/VIcon'
    import VAvatar from 'vuetify/lib/components/VAvatar'
    import VeeValidate from 'vee-validate'
    import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
    

    export default {
        name: 'activeProjectLabelList',
        computed: {
            ...mapState(['projects', 'projectId']),
            otherProjects: function() {
                if (this.projects) {
                    return this.projects.filter(project => project.id != this.projectId) 
                }
                else {
                    return []
                }
            }
        },
        props: {
            addLabel: null,
        },
        methods: {
            ...mapMutations(['setProjectId']),
            change: function(id){
                this.setProjectId(id)
                this.$emit('refresh')
            }
        }
    }

</script>

<style lang="sass">

@import '../../../styles/baseDesing.scss';

.labelNumber
    max-width: 24px
    max-height: 24px
    font-size: 8pt

.tileAddButton
    max-height: 5vh

.tileComponent
    max-height: 5vh

.tileComponent:hover
  background-color: #303030;
  background-size: 100%;
  transition: background 0s;


.tileTitle
    font-size: 9pt
    color: #f9f9f9
    margin-top: 0

.addLabelButton
    max-width: 16px
    max-height: 16px
</style>
