
global.setpageloading = function () {
    $("#loading-bar").addClass("loading-bar-show");
};

global.setpageloaded=function () {
    $("#loading-bar").removeClass("loading-bar-show");
};


import Index from './components/index.vue'
import Post from './components/post.vue'
import About from './components/about.vue'
import Error from './components/error.vue'
import CategoryPost from './components/category_post.vue'
import TagPost from './components/tag_post.vue'

const router = new VueRouter({
    routes: [
        { path: '/post/:url',name:'postDetail', component: Post},
        { path: '/category/:mode/:key', name:'categoryPostList', component:CategoryPost},
        { path: '/tag/:mode/:key', name: 'tagPostList', component: TagPost},
        { path: '/about', name:'aboutPage', component: About},
        { path: '', component: Index},
        { path: '/error',name:'error', component: Error},
        { path: '*', component: Error}
    ]
});

const blogapp = new Vue({
    el: "#app",
    router: router
});


