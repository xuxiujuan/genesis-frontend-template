<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { initRoutes } from './router'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['btnsPerm'])
  },
  created() {
    this.getBtnPerm()
    this.setRoute()
    this.getInfo()
  },

  methods: {
    ...mapActions({
      'getUserMenus': 'permission/getUserMenus',
      'getAuthorizedButton': 'permission/getAuthorizedButton',
      'getInfo': 'user/getInfo'
    }),
    getBtnPerm() {
      this.getAuthorizedButton()
      Vue.prototype.$_has = (btnArr = []) => {
        let permission = true
        for (let i = 0; i < btnArr.length; i++) {
          if (!this.btnsPerm.includes(btnArr[i])) {
            permission = false
            break
          }
        }
        return permission
      }
    },
    async setRoute() {
      const routes = await this.getUserMenus()
      initRoutes[0].children = routes
      this.$router.addRoutes(initRoutes)
    }
  }
}
</script>
