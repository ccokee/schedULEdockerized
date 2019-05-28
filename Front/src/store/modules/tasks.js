import axios from 'axios'
import { stat } from 'fs';

export default {
  namespaced: true,
  state: {
    open: [],
    inprogress: [],
    testing: [],
    closed: [],
    all: [],
    names: [{label: 'Open', value: 'open'}, {label: 'In progress', value: 'inprogress'}, {label: 'Testing', value: 'testing'}, {label: 'Closed', value: 'closed'}],
    selectedTask : null,
    filterLabels: [],
    filterUsers: []
  },
  mutations: {
    addTask: function(state, task) {
      state[task.status].push(task)
      state.all.push(task)
    },
    updateDataTask: function(state, task) {
      let i = 0
      for(; i < state[task.status].length; i++){
        if(state[task.status][i].id == task.id) {
          break
        }
      }

      state[task.status].splice(i, 1)
      state[task.status].push(task)

      i = 0
      for(; i < state.all.length; i++){
        if(state.all[i].id == task.id) {
          break
        }
      }

      state.all.splice(i, 1)
      state.all.push(task)
    },
    removeTask: function(state, data) {
      state[data.status].splice(state[data.status].indexOf(data.task), 1)
    },
    setOpen: function(state, open) {
      for (let task of open) {
        if (task.status != 'open') {
          task.status = 'open'
          axios.post('http://process.env.PROXY_HOST_PORT/tasks/update', task)
        
          for(let taskGen of state.all) {
            if(taskGen.id == task.id) {
              taskGen.status = task.status
            }
          }
        }
      }
      state.open = open
    },
    setClosed: function(state, closed) {
      for (let task of closed) {
        if (task.status != 'closed') {
          task.status = 'closed'
          axios.post('http://process.env.PROXY_HOST_PORT/tasks/update', task)
          
          for(let taskGen of state.all) {
            if(taskGen.id == task.id) {
              taskGen.status = task.status
            }
          }
        }
      }
      state.closed = closed
    },
    setTesting: function(state, testing) {
      for (let task of testing) {
        if (task.status != 'testing') {
          task.status = 'testing'
          axios.post('http://process.env.PROXY_HOST_PORT/tasks/update', task)
        
          for(let taskGen of state.all) {
            if(taskGen.id == task.id) {
              taskGen.status = task.status
            }
          }
        }
      }
      state.testing = testing
    },
    setInprogress: function(state, inprogress) {
      for (let task of inprogress) {
        if (task.status != 'inprogress') {
          task.status = 'inprogress'
          axios.post('http://process.env.PROXY_HOST_PORT/tasks/update', task)
        
          for(let taskGen of state.all) {
            if(taskGen.id == task.id) {
              taskGen.status = task.status
            }
          }
        }
      }
      state.inprogress = inprogress
    },
    setSelectedTask: function(state, task) {
      state.selectedTask = task
    },
    setTasks: function(state, tasks) {
      state.closed = []
      state.open = []
      state.inprogress = []
      state.testing = []
      state.all = []

      for(let task of tasks) {
        state[task.status].push(task)
        state.all.push(task)
      }
    },
    addLabelToCurrentTask: function(state, label) {
      state.selectedTask.labels.push(label)
    },
    addLabelToCheckpoint: function(state, data) {
      for (let checkpoint of state.selectedTask.checkpoints) {
        if (checkpoint.id == data.id) {
            checkpoint.labels.push(data.label)
            break
        }
      }
    },
    addFilterLabel: function(state, label) {
      if(!state.filterLabels.includes(label.toLowerCase())) {
        state.filterLabels.push(label.toLowerCase())
      }
    },
    removeFilterLabel: function(state, label) {
      state.filterLabels.splice(state.filterLabels.indexOf(label.toLowerCase()), 1)
    },
    addFilterUsers: function(state, user) {
      if (!state.filterUsers.includes(user.toLowerCase())) {
        state.filterUsers.push(user.toLowerCase())
      }
    },
    removeFilterUsers: function(state, user) {
      state.filterUsers.splice(state.filterUsers.indexOf(user.toLowerCase()), 1)
    },
    cleanFilterLabels: function(state) {
      state.filterLabels = []
    }
  },
  actions: {
    async loadTask ({ commit }) {
      try {
        let response = await axios.get('http://process.env.PROXY_HOST_PORT/task/' + selectedTask.id)
        let task = response.data
        commit('setSelectedTask', task)
      }
      catch (error) {
        console.log(error)
      }
    },
    filter ({ state, commit }) {
      commit('setTasks', state.all.slice(0))

      let filtered = {
        open: state.open,
        closed: state.closed,
        inprogress: state.inprogress,
        testing: state.testing
      }

      //Filtro de labels
      if (state.filterLabels.length > 0) {
        for (let type of state.names) {
          filtered[type.value] = filtered[type.value].filter(task => {
            for(let taskLabel of task.labels) {
              if(state.filterLabels.includes(taskLabel.name.toLowerCase())){
                return true
              }
            }
            return false
          })
        }
      }

      //Filtro de usuarios
      if (state.filterUsers.length > 0) {
        for (let type of state.names) {
          filtered[type.value] = filtered[type.value].filter(task => {
            for(let userTask of task.users) {
              if(state.filterUsers.includes(userTask.username.toLowerCase()) ||
                  state.filterUsers.includes(userTask.email.toLowerCase())){
                return true
              }
            }
            return false
          })
        }
      }

      commit('setOpen', filtered.open)
      commit('setClosed', filtered.closed)
      commit('setInprogress', filtered.inprogress)
      commit('setTesting', filtered.testing)
    }
  }
}

