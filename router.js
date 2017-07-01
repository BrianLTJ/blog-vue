import Post from './components/post.vue'

const index={
    template: "<h2>Blog index</h2>"
};

// const Post = {
//     template: "<div><p>Blog detail</p><div>{{ $route.params.url }}</div></div>"
// };

const Error = {
    template: "<div>ERROR: 404</div>"
}

const router = new VueRouter({
    routes: [
        { path: '/post/:url', component: Post},
        { path: '', component:index},
        { path: '*', component:Error}
    ]
});

const app = new Vue({
    el: "#app",
    router: router
});

