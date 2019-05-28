import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tasks from './modules/tasks'
import project from './modules/project'
import axios from 'axios'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks,
      project
    },
    state: {
      host: 'http://process.env.PROXY_HOST_PORT/',
      token: null,
      username: null,
      email: null,
      projects: null,
      projectId: null,
      isAdmin: false,
      avatar: null
    },
    mutations: {
      setAvatar: (state, avatar) => {
        state.avatar = avatar
      },
      setUserData: (state, data) => {
        state.token = data.token
        state.username = data.username
        state.email = data.email
        state.projects = data.projects
        state.avatar = data.avatar
        state.isAdmin = data.isAdmin
        if (data.projects && data.projects.length > 0) {
          state.projectId = state.projects[0].id
        }
        setAxiosHeaders(data.token)
      },
      setProjectId: (state, id) => {
        state.projectId = id
      },
      logout: (state) => {
        state.token = null
        state.username = null
        state.isAdmin = false
        state.email = null
      },
      addProject: (state, project) => {
        state.projects.push(project)
      }
    }
  })

  return Store
}

function setAxiosHeaders (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
