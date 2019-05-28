<template>
    <v-layout>
        <v-avatar class="avatarPropies" v-for="element in taskUsers" :key="element.id">
            <span :if="element.avatar.length==0" class="white--text headline">
                {{ element.label.substring(0,1) }}
            </span>
            <img :if="element.avatar.length!=0" :src="element.avatar"/>
        </v-avatar>
    </v-layout>
</template>

<script>
    import VContainer from 'vuetify/lib/components/VGrid/VContainer'
    import VLayout from 'vuetify/lib/components/VGrid/VLayout'
    import VAvatar from 'vuetify/lib/components/VAvatar'
    import VImg from 'vuetify/lib/components/VImg'
    import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
    
    export default {
        name: 'overlapedAvatars',
        data: function () {
                return {
                    users: []
                }
        },
        watch: {
            taskUsers: function() {
            this.updateMembers()
            }
        },
        created: function() {
        if (!this.selectedTask) {
            this.$router.push('/dashboard')
            } else {
            this.users = this.selectedTask.users
            }
        },
        methods: {
            ...mapMutations('tasks', ['setSelectedTask', 'updateDataTask', 'removeTask']),

            updateMembers: async function() {
            let found = false
            let to_add = []
            let to_delete = []

            for (let user of this.selectedTask.users) {
                found = false
                for (let userid of this.usersSelected) {
                    if (userid == user.id) {
                        found = true
                    }
                }

                if(!found) {
                    to_delete.push(user)
                }
            }
            
            for (let userid of this.usersSelected) {
                found = false
                for (let user of this.selectedTask.users) {
                    if (userid == user.id) {
                        found = true
                    }
                }

                if(!found) {
                    to_add.push(userid)
                }
            }
            
            for(let user of to_add) {
                let response = await this.$axios.post(this.host+'tasks/assign_user', {
                    task_id: this.selectedTask.id,
                    user_id: user
                })
            }

            for (let user of to_delete) {
                let response = await this.$axios.post(this.host+'tasks/unassign_user', {
                    task_id: this.selectedTask.id,
                    user_id: user.id
                })
            }
        },
        },
        computed:{
            ...mapState('tasks', ['selectedTask']),
            taskUsers() {
                let computedUsers = []
                for(let user of this.selectedTask.users){
                    console.log("lalala")
                    computedUsers.push({label: user.username, id: user.id, avatar: user.avatar})
                }
            }
        }
    }

</script>


<style lang="sass">

@import '../styles/baseDesing.scss';

.avatarPropies
    border-style: solid
    border-width: 1px
    border-color: dark-grey

</style>