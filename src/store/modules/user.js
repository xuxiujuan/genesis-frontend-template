import { getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { delCookie } from '@/utils'

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
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          if (!response) {
            Promise.reject('Verification failed, please Login again.')
          }
          const { chineseName } = response.data.data
          commit('SET_NAME', chineseName)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    delCookie('gns_session')
    resetRouter()
    window.location.href = 'api/logout'
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
