import Index from './components/index.vue'
import Post from './components/post.vue'
import Error from './components/error.vue'

const router = new VueRouter({
    routes: [
        { path: '/post/:url',name:'postDetail', component: Post},
        { path: '', component: Index},
        { path: '/error',name:'error', component: Error},
        { path: '*', component: Error}
    ]
});

const blogapp = new Vue({
    el: "#app",
    router: router,

});

