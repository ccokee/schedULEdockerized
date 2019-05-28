<template>
      <v-container fluid fill-height>
        <v-layout row wrap>
            <v-flex justify-center align-center>
            <v-card class="cardDimensions-auth" dark raised>
              <v-toolbar dark>
                <v-toolbar-title>
                 <v-btn class="tbButton" depressed dark fab small icon>
                <v-icon size="30" >person</v-icon>
                </v-btn><span class="tituloToolbar">AUTH</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <img src="../statics/logo-web.png"
                    class="logoAuth"
                />
              </v-toolbar>
              <v-card-text>
                <v-form class="inputs">
                  <v-text-field class="fieldDimensions" color="green" v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field class="fieldDimensions" color="green" v-model="password" prepend-icon="lock" name="password" label="Password" type="password" @keyup.enter="sendLogin"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat small @click="$router.push('/register')">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp" :center="$vuetify.breakpoint.smAndDown" dark>person</v-icon><span v-if="$vuetify.breakpoint.mdAndUp">Register</span>
                </v-btn>
                <v-btn flat small color="green" @click="sendLogin">
                   <v-icon color="green" :left="$vuetify.breakpoint.mdAndUp" :center="$vuetify.breakpoint.smAndDown" dark>send</v-icon><span v-if="$vuetify.breakpoint.mdAndUp">Login</span>
                </v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import VContainer from 'vuetify/lib/components/VGrid/VContainer'
import VLayout from 'vuetify/lib/components/VGrid/VLayout'
import VFlex from 'vuetify/lib/components/VGrid/VFlex'
import VToolbar from 'vuetify/lib/components/VToolbar'
import VCard from 'vuetify/lib/components/VCard'
import VForm from 'vuetify/lib/components/VForm'
import VIcon from 'vuetify/lib/components/VIcon'
import VeeValidate from 'vee-validate'

export default {
  data: function () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    ...mapMutations(['setUserData']),
    sendLogin: function () {
      this.$axios.post('http://process.env.PROXY_HOST_PORT/users/get', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.setUserData(response.data)
          if (response.data.projects && response.data.projects.length > 0) {
            this.$router.push('/dashboard')
          }
          else{
            this.$router.push('/emptyDashboard')
          }
        })
        .catch((err) => {
          this.$q.notify({
            message: 'Datos incorrectos',
            color: 'red',
            position: 'top'
          })
          console.log(err)
        })
    }
  }
}
</script>

<style lang="sass">
@import '../styles/baseDesing'

.logoAuth
    margin-top: 0vh
    margin-left: 0vw
    width: auto
    height: 5vh
    min-height: 20px

.tbButton
    max-width: 40px
    max-height: 40px

.inputs
  display: flex
  width: 30vw
  flex-direction: column
  text-align: center

.fieldDimensions
    max-width: 30vw
    width: 30vw
    font-weight: normal
    font-size: 10pt

.cardDimensions-auth
    min-height: 30vh
    max-height: 50vh
    max-width: 90vw
    min-width: 30vw

.tituloToolbar
    font-weight: bold
    color: lightGray
    font-size: 12pt

</style>
