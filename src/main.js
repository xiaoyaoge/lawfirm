import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueResourceConfig from './vue.resource.config'
import routes from './routes'
import App from './App.vue'
//vue滑块
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        next({ path: '/main' });
    } else {
        next();
    }
})

router.afterEach(transition => {

})

//Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')