<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'

Vue.prototype.$axios = axios
Vue.use(Vuetify)
export default {
  name: 'App'
}
</script>

<style lang="sass">
#q-app
  height: 100vh
  width: 100vw

.text-main
  color: #a2aa33

.bg-main
  background: #44815c

.text-back
  color: #a2aa33

.bg-back
  background: #1e272e

</style>
