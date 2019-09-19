import Vue from 'vue'
import Router from 'vue-router'
import { loadComp } from '@/utils'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export const initRoutes = [{
  path: '/',
  redirect: '/dashboard',
  component: loadComp('layout/index'),
  children: []
}]

const constantRoutes = [{
  path: '/404',
  component: (resolve) => require(['./views/error-page/404.vue'], resolve)
}]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
