export const state = () => ({
  snackbar: {
    show: false,
    message: '',
    timeout: 1000,
  },
})

export const getters = {
  snackbar: (state) => state.snackbar,
}
export const mutations = {
  showSnackbar(state, message) {
    state.snackbar.show = true
    state.snackbar.message = message
  },
  closeSnackbar(state) {
    state.snackbar.show = false
  },
}

export const actions = {
  showSnackbar({ commit, getters }) {
    const timeout = getters.snackbar.timeout
    setTimeout(() => {
      commit('showSnackbar')
    }, timeout)
  },
  closeSnackbar({ commit }) {
    commit('closeSnackbar')
  },
}
