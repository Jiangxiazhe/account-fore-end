
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'


export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

// import { reqAll, reqGet, reqPost } from '@/fetch/index.js'
// Vue.prototype.$reqAll = reqAll;
// Vue.prototype.$reqGet = reqGet;
// Vue.prototype.$reqPost = reqPost;
