<template>
      <v-layout align-center fluid :justify-center="minified" :justify-end="!minified" >
            <v-btn v-if="!minified" icon color="green" @click.stop="$emit('addTaskExpand')">
                <v-icon>add</v-icon>
            </v-btn>
            <v-btn depressed dark flat :icon="!minified" @click.stop="$emit('peque')">
              <v-icon v-if="minified" dark size=18 >fa-chevron-right</v-icon>
              <v-icon v-if="!minified" dark size=18 >fa-chevron-left</v-icon>
            </v-btn>
      </v-layout>
</template>

<script>
    import VContainer from 'vuetify/lib/components/VGrid/VContainer'
    import VLayout from 'vuetify/lib/components/VGrid/VLayout'
    import VIcon from 'vuetify/lib/components/VIcon';
    import VBtn from 'vuetify/lib/components/VBtn';
    import 'vuetify/dist/vuetify.min.css'

    export default {
        name: 'expandIcon',
        components: {
            VContainer,
            VLayout,
            VBtn,
            VIcon
        },
        props: {
            minified: null
        }
    }

</script>

<style lang="scss" module>



@import '../../../styles/baseDesing.scss';

</style>