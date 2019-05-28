export default {
  namespaced: true,
  state: {
    project: null
  },
  mutations: {
    setProject: function(state, project) {
        state.project = project
    }
  },
}

