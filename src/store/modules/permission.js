import { getMenus, getAuthorizedButton } from '@/api/permission'
import { buildMenu, depSortBy } from '@/utils/index.js'

const state = {
  menus: [],
  sideMenus: [],
  btnsPerm: []
}

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_SIDEMENUS: (state, sideMenus) => {
    state.sideMenus = sideMenus
  },
  SET_BTN_PERMISSION: (state, btnsPerm) => {
    state.btnsPerm = btnsPerm
  }
}

const actions = {
  // user menus
  getUserMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenus().then(response => {
        const { data } = response.data
        const meuns = buildMenu(data)
        depSortBy(meuns, 'children', 'sequence')
        commit('SET_MENUS', meuns)
        resolve(meuns)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user button permission
  getAuthorizedButton({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAuthorizedButton().then(response => {
        const { data } = response.data
        const btnsPerm = data.map(item => item.name)
        commit('SET_BTN_PERMISSION', btnsPerm)
        resolve(btnsPerm)
      }).catch(error => {
        reject(error)
      })
    })
  },

  setSideMenus({ commit, state }, sideMenus) {
    commit('SET_SIDEMENUS', sideMenus)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
