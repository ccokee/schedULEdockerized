<template>
    <div>
        <v-dialog max-width="55px">
            <v-btn flat small fab slot="activator">
                <v-icon>more_horiz</v-icon>
            </v-btn>
            <v-card>
                <v-card-actions>
                    <v-btn flat small fab @click="deleteProject">
                        <v-icon>delete</v-icon>
                    </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    
    export default {
        name: 'options',
        components: {

        },
        methods:{
            deleteProject(){

            }
        }
    }

</script>

<style lang="scss" module>

@import '../styles/baseDesign';

</style>