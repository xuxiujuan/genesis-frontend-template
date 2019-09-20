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
  Loading
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

const instance = Loading.service({
  fullscreen: true,
  text: '页面加载中…'
})
router.afterEach((to, from, after) => {
  if (instance.visible) {
    instance.close()
  }
})

Vue.config.productionTip = false

Vue.directive('has', {
  inserted: function(el, binding) {
    if (Vue.prototype.$_has && !Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

Vue.prototype.$_has = (btnArr = []) => {
  let permission = true
  for (let i = 0; i < btnArr.length; i++) {
    if (!store.getters.btnsPerm.includes(btnArr[i])) {
      permission = false
      break
    }
  }
  return permission
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
