<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { initRoutes } from './router'

export default {
  name: 'App',
  created() {
    this.getUserInfo()
    this.setRoute()
  },

  methods: {
    ...mapActions({
      'getUserInfo': 'user/getUserInfo',
      'getUserMenus': 'permission/getUserMenus'
    }),
    async setRoute() {
      const routes = await this.getUserMenus()
      initRoutes[0].children = routes
      this.$router.addRoutes(initRoutes)
    }
  }
}
</script>
