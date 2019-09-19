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
import { AppMain, Navbar, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
}
</script>
