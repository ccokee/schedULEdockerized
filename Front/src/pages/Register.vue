<template>
      <v-container fluid fill-height>
        <v-layout row wrap>
            <v-flex justify-center align-center>
            <v-card class="cardDimensions" dark raised>
              <v-toolbar dark>
                <v-toolbar-title>
                 <v-btn class="tbButton" depressed dark fab small icon>
                <v-icon size="30" >person</v-icon>
                </v-btn><span class="tituloToolbar">SIGN UP</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <img src="statics/logo-web.png"
                    class="logoAuth"
                />
              </v-toolbar>
              <v-card-text>
                <v-form class="inputs">
                  <v-text-field class="fieldDimensions" color="green" v-model="email" prepend-icon="mail" name="login" label="Email" type="text"></v-text-field>
                  <v-text-field class="fieldDimensions" color="green" v-model="username" prepend-icon="person" name="password" label="Usuario" type="text"></v-text-field>
                  <v-text-field class="fieldDimensions" color="green" v-model="password" prepend-icon="lock" name="password" label="Password" type="password" @keyup.enter="sendLogin"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/')">
                    <v-icon :left="$vuetify.breakpoint.mdAndUp" :center="$vuetify.breakpoint.smAndDown" dark>person</v-icon><span v-if="$vuetify.breakpoint.mdAndUp">Back</span>
                </v-btn>
                <v-btn @click="sendRegister">
                   <v-icon :left="$vuetify.breakpoint.mdAndUp" :center="$vuetify.breakpoint.smAndDown" dark>send</v-icon><span v-if="$vuetify.breakpoint.mdAndUp">Send</span>
                </v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      email: null,
      username: null,
      password: null
    }
  },
  computed: {
    ...mapState('tareas', ['nTareas'])
  },
  methods: {
    sendRegister: function () {
      if (!(this.email && this.username && this.password)) {
        this.$q.notify({
          message: 'Rellena todos los campos',
          color: 'red',
          position: 'top'
        })
      } else if (this.email.includes('@') && this.email.includes('.')) {
        this.$axios.post(process.env.PROXY_HOST_PORT + '/users/add', {
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(response => {
            this.$q.notify({
              message: 'Usuario creado correctamente',
              color: 'main',
              position: 'top'
            })
          })
          .catch(() => {
            this.$q.notify({
              message: 'Email o usuario ya en uso',
              color: 'red',
              position: 'top'
            })
          })
      } else {
        this.$q.notify({
          message: 'Email no válido',
          color: 'red',
          position: 'top'
        })
      }
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

.tituloToolbar
    font-weight: bold
    color: lightGray
    font-size: 12pt

.cardDimensions
    max-height: 90vh
    min-height: 40vh
    max-width: 90vw
    min-width: 30vw
</style>
