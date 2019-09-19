import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import '@/styles/index.scss'
import '../mock/index.js'

import {
  Main,
  Header,
  Aside,
  Container,
  Menu,
  Submenu,
  MenuItem,
  Scrollbar,
  Icon,
  Button,
  Breadcrumb
} from 'genesis-ui'

Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Scrollbar)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Breadcrumb)

Vue.config.productionTip = false

Vue.directive('has', {
  inserted: function(el, binding) {
    if (Vue.prototype.$_has && !Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
