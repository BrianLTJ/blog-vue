import Index from './components/index.vue'
import Post from './components/post.vue'
import Error from './components/error.vue'

const router = new VueRouter({
    routes: [
        { path: '/post/:url', component: Post},
        { path: '', component: Index},
        { path: '*', component: Error}
    ]
});

const blogapp = new Vue({
    el: "#app",
    router: router,
    methods: {
        fetch_list: function(){
            $.ajax({
                method: "get",
                url: '/data/postlist',
                contentType: "text/plain",
                success: function (data,status) {
                    blogapp.$data['post_list']=JSON.parse(data);
                }
            });
        }
    },
    mounted: function () {
        $(document).ready(function () {
            blogapp.fetch_list();
        });
    }
});

