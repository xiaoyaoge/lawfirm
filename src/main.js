import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResourceConfig from './vue.resource.config';
import routes from './routes'
import App from './App.vue'


Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
    //mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})

router.afterEach(transition => {

});


new Vue({ 
  router, 
  render: h => h(App)
}).$mount('#app')