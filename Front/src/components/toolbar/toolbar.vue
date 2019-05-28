<template>
    <v-toolbar fixed dark app clipped-left>
        <v-toolbar-title class="logoBlock">
        	<img
            v-if="$vuetify.breakpoint.mdAndUp"
            src="../../statics/logo-web.png"
            class="logo-toolbar"
            @click="$vuetify.goTo(0)"
            />
            <img
            v-if="$vuetify.breakpoint.smAndDown"
            src="../../statics/logo-mini.png"
            class="logo-toolbar"
            @click="$vuetify.goTo(0)"
            />
        </v-toolbar-title>

        <v-layout row>
        <v-flex xs2 shrink>
        </v-flex>
        </v-layout>
  
        <v-spacer></v-spacer> 
        <v-toolbar-items>

        <v-btn v-if="$vuetify.breakpoint.mdAndUp" icon @click="$emit('refresh')">    
            <v-icon>refresh</v-icon>
        </v-btn>

        <v-btn v-if="$vuetify.breakpoint.mdAndUp" icon @click="logoff">
            <v-icon>reply_all</v-icon>
        </v-btn>

        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import VToolbar from 'vuetify/lib/components/VToolbar'
    import VFlex from 'vuetify/lib/components/VGrid/VFlex'
    import VBtn from 'vuetify/lib/components/VBtn'
    import VBtnToggle from 'vuetify/lib/components/VBtnToggle'
    import VIcon from 'vuetify/lib/components/VIcon'
    import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
    
    export default {
        name: 'toolbar',
        props: {
            filtroMeTeam: false,
            contentView: 'kanban',
            showUserMenu: null,
        },
        computed: {
            textoSwitch(){
                if (this.$vuetify.breakpoint.smAndUp) {
                    if(this.fitroMeTeam){ 
                        return "Me";
                    } else {
                        return "Team";
                    }
                } else {
                    return "";
                }
            }
        },
        methods: {
            ...mapMutations(['logout']),
            logoff() {
                this.logout()
                this.$router.push('/')
            }
        }
    }

</script>

<style lang="sass">

@import '../../styles/baseDesing.scss';

.logoBlock
    margin-top: 1vh
    min-height: 6vh

.logo-toolbar
    height: 6vh

.filtroSwitch
    margin-top: 24px
    margin-left: 2.5vh
    min-width: 85px

.contentViewToogle
    margin-top: 0vh

</style>