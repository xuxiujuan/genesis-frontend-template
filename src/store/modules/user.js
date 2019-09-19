import { logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  username: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.username = name
  }
}

const actions = {
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response.data
        if (!data) {
          Promise.reject('Verification failed, please Login again.')
        }
        const { chineseName } = data
        commit('SET_NAME', chineseName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
