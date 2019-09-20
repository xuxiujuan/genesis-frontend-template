<template>
  <df-container class="df-navigation" direction="vertical">
    <navbar />
    <df-container>
      <sidebar />
      <app-main />
    </df-container>
  </df-container>
</template>

<script>
import store from '@/store/index.js'
import { AppMain, Navbar, Sidebar } from './components'
import { Loading } from 'genesis-ui'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters.btnsPerm) {
      next()
    }
    store.dispatch('permission/getAuthorizedButton').then(res => {
      const loadingInstance = Loading.service()
      loadingInstance.close()
      next()
    })
  }
}
</script>
