<template>
  <df-header>
    <div class="header-left">
      <h1 class="header-left__title">
        <img
          class="logo"
          src="../../assets/logo-orient_securities.png"
        >
        <span class="system-name">genesis-frontend-template</span>
      </h1>
      <df-menu
        :default-active="activeIndex"
        class="header-left__menu"
        mode="horizontal"
      >
        <df-menu-item v-for="(item, index) in interalMenus" :key="item.name" :index="item.route" @click="handleClick(item)">
          {{ item.name || index }}
        </df-menu-item>
      </df-menu>
    </div>
    <div class="header-right">
      <div class="header-right__username">{{ username }}</div>
      <div class="header-right__logout-btn" @click="logout">注销</div>
    </div>
  </df-header>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'menus',
      'username'
    ]),
    interalMenus() {
      const temp = []
      this.menus.forEach(item => {
        if (!item.hidden) {
          temp.push(item)
        }
      })
      return temp
    },
    menuIndexs() {
      return this.menus.map(item => item.path)
    },
    activeIndex() {
      const route = this.$route
      const { matched } = route
      if (matched.length >= 1 && matched[1].path) {
        return matched[1].path.substring(1)
      }
      return ''
    }
  },
  watch: {
    activeIndex: {
      immediate: true,
      handler(newVal) {
        this.setSideMenus(newVal)
      }
    }
  },
  methods: {
    handleClick(menuItem) {
      const route = this.$route
      const to = menuItem.redirect || '/' + menuItem.path
      if (to === route.fullPath) {
        return
      }
      this.$router.push({
        path: to
      })
    },
    setSideMenus(index) {
      const menu = this.menus.find(item => item.route === index)
      this.$store.dispatch('permission/setSideMenus', menu.children || [])
    },
    logout() {
      window.location.href = 'api/logout'
    }
  }
}
</script>
