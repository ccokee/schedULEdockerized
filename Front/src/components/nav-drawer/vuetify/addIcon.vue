<template>
      <v-container class="iconContainer">
        <v-layout align-center justify-center row fill-height>
            <v-flex>
            <v-icon dark size=35  @click.stop="$emit('addTaskAddIcon')">add</v-icon>
            </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
    import VContainer from 'vuetify/lib/components/VGrid/VContainer'
    import VLayout from 'vuetify/lib/components/VGrid/VLayout'
    import VFlex from 'vuetify/lib/components/VGrid/VFlex'
    import VIcon from 'vuetify/lib/components/VIcon';
    import 'vuetify/dist/vuetify.min.css'

    export default {
        name: 'addIcon',
        components: {
            VContainer,
            VLayout,
            VFlex,
            VIcon
        },
        props: {
            minified: null
        }
    }

</script>

<style lang="sass">
@import '../../../styles/baseDesing.scss';

.iconContainer
    background: #44815c
    height: 80px

.iconContainer:hover
  background-color: #55cc7d
  background-size: 100%
  transition: background 0s

</style>