import Vue from 'vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import Legal from './pages/Legal.vue'
import Disclaimer from './pages/Disclaimer.vue'
import Orga from './pages/Orga.vue'
import Countries from './pages/Countries.vue'
import Country from './pages/Country.vue'
import FAQ from './pages/FAQ.vue'
import p404 from './pages/404.vue'

import styles from './global.css'
import VueHead from 'vue-head'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(VueHead)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.filter('date', function(value) {
  if (value) {
    return new Date(value).toLocaleDateString();
  }
})

Vue.filter('majuscule', function(value) {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
})

Vue.filter('countryname', function(value) {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().split(',')[0]
  }
})

Vue.filter('currency', function(value) {
  if (value) {
    return Number.parseFloat(value).toLocaleString();
  }
})

const store = {}
store.url = 'https://script.google.com/macros/s/AKfycbxqd3bFwVpmY1hGrq0HNheCGIwiXoVIXBUB7CcDnsQ-_6uKHO8l/exec?nav=u'
store.cacheUrl = 'https://lobbyland.eu/data/'
store.lang = "EN"
store.ctxDist = ctxDist
console.log('ctxDist', ctxDist)

const param = function(route) {

  if (["en", "fr","EN", "FR"].indexOf(route.query.lang) >= 0) {
    store.lang = route.query.lang.toUpperCase()
  }
 return { storage: store}
}

const routes = [
  { path: '/', component: Home, props: param},
  { path: '/orga/:id', component: Orga , props: param},
  { path: '/country/:id', component: Country , props: param},
  { path: '/countries', component: Countries , props: param},
  { path: '/disclaimer', component: Disclaimer , props: param},
  { path: '/legal', component: Legal , props: param},
  { path: '/FAQ', component: FAQ , props: param},
  { path: '/404', component: p404 , props: param},
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router,
  render(h) {
    return h(App, {
      props: {
        storage: store
        }
    })
  }
}).$mount('#app')

