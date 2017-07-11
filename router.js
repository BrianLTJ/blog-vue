
global.setpageloading = function () {
    // console.log('loading');
    $("#loading-bar").addClass("loading-bar-show");
};

global.setpageloaded=function () {
    // console.log('loaded');
    setTimeout(function () {
        $("#loading-bar").removeClass("loading-bar-show");
    },1500);

};

global.setHeaderTitles=function (maintitle,subtitle) {
    maintitle = maintitle || "";
    subtitle = subtitle || "";
    $("#header-main-title").text(maintitle);
    $("#header-sub-title").text(subtitle);
    $("#header-index").addClass("header-hidden");
    $("#header-normal-page").removeClass("header-hidden");
};

global.showIndexHeader=function () {
    $("#header-normal-page").addClass("header-hidden");
    $("#header-index").removeClass("header-hidden");
};

global.showMaxHeader=function () {
    $(document).ready(function () {
        $("#header").addClass('header-max');
        $("#header").removeClass('header-medium header-small');
    });
};

global.showMediumHeader=function () {
    $(document).ready(function () {
        $("#header").addClass('header-medium');
        $("#header").removeClass('header-max header-small');
    });
};

global.urlAppendStamp=function (url) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    let tmpstmp = new Date(Date.now()).getTime();
    return url+"?atmp="+(tmpstmp%10000).toString()+text;
}

import Index from './components/index.vue'
import Post from './components/post.vue'
import About from './components/about.vue'
import Error from './components/error.vue'
import CategoryPost from './components/category_post.vue'
import TagPost from './components/tag_post.vue'
import Archive from './components/archive.vue'

const router = new VueRouter({
    routes: [
        { path: '/post/:url',name:'postDetail', component: Post},
        { path: '/post', component: Archive},
        { path: '/archive', component: Archive},
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


