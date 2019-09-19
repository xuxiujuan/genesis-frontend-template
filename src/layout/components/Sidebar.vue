<template>
  <df-aside v-show="isShowSide" width="auto">
    <df-menu
      :default-active="activeIndex"
      class="df-menu-vertical-demo"
      router
    >
      <template v-for="(fRoute, index) in sideMenus">
        <template v-if="fRoute.children">
          <df-submenu :key="index" :index="fRoute.name">
            <template slot="title">{{ fRoute.name }}</template>
            <template v-for="cRoute in fRoute.children">
              <df-submenu v-if="cRoute.children" :key="cRoute.name" :index="cRoute.route">
                <template slot="title">{{ cRoute.name }}</template>
                <df-menu-item v-for="tRoute in cRoute.children" :key="tRoute.name" :index="tRoute.route" :route="tRoute">
                  {{ tRoute.name }}
                </df-menu-item>
              </df-submenu>
              <df-menu-item v-else :key="cRoute.name" :index="cRoute.route" :route="cRoute">
                {{ cRoute.name }}
              </df-menu-item>
            </template>
          </df-submenu>
        </template>
        <template v-else>
          <df-menu-item :key="fRoute.name" :index="fRoute.route" :route="fRoute">
            {{ fRoute.name }}
          </df-menu-item>
        </template>
      </template>
    </df-menu>
  </df-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sideMenus'
    ]),
    isShowSide() {
      return Array.isArray(this.sideMenus) && this.sideMenus.length > 0
    },
    activeIndex() {
      const { matched } = this.$route
      const len = matched.length
      if (len > 0 && matched[len - 1].path) {
        const tempArr = matched[len - 1].path.split('/')
        return tempArr[tempArr.length - 1]
      }
      return ''
    }
  }
}
</script>

