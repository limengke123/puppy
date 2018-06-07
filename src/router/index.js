import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'money',
    meta: {
      main: true
    },
    component: () => import(/* webpackChunkName: "money" */'../views/money')
  },
  {
    path: '/note',
    name: 'note',
    meta: {
      main: true
    },
    component: () => import(/* webpackChunkName: "note" */'../views/note')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      main: true
    },
    component: () => import(/* webpackChunkName: "money" */'../views/about')
  },
  {
    path: '/statics',
    name: 'statics',
    meta: {
      main: false
    },
    component: () => import(/* webpackChunkName: "money" */'../views/statics')
  }
]

export default new Router({
  routes
})
