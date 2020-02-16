import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import SelectShare from '../views/SelectShare.vue'
import ThreeFork from '../views/ThreeFork.vue'
import KDJ from '../views/KDJ.vue'
import MACD from '../views/MACD.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/test',
    name: 'test',
    component: Test
  }, {
    path: '/selectShare',
    name: 'selectShare',
    component: SelectShare
  }, {
    path: '/threeFork',
    name: 'threeFork',
    component: ThreeFork
  }, {
    path: '/kdj',
    name: 'kdj',
    component: KDJ
  }, {
    path: '/macd',
    name: 'macd',
    component: MACD
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
