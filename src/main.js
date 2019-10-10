import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import '@/styles/index.scss'
import '../mock/index.js'
import axios from 'axios'
import DataTable from '@/components/data-table/index.vue'
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
  Loading,
  Image,
  Collapse,
  CollapseItem,
  Dialog,
  Table,
  TableColumn,
  Pagination,
  Form,
  FormItem,
  DatePicker,
  Select,
  Option,
  FunctionBar,
  Breadcrumb,
  BreadcrumbItem,
  Message,
  Tabs,
  TabPane,
  Input,
  List,
  ListItem
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
Vue.use(Image)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(FunctionBar)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Input)
Vue.use(List)
Vue.use(ListItem)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

Vue.prototype.$axios = axios
Vue.component('DataTable', DataTable)

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
