<template>
    <div>
        <div class="post-info">
            <h1 id="post-title">{{ meta.title }}</h1>
            <div>url: {{ $route.params.url }}</div>
            <div>
                <div v-html="post"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            post: null,
            error: null,
            meta: {
                "title": "",
                "author": "",
                "url": "",
                "time": "",
                "category": [],
                "tags": []
            }
        }
    },
    created () {

        this.postInit();
    },
    watch: {
        '$route': 'postInit'
    },
    methods: {
        postInit () {
            $(document).ready(function () {
                $("#header").addClass('header-medium');
                $("#header").removeClass('header-max header-small');
            })
            this.fetchData();

        },
        fetchData () {
            this.post = null;
            this.loading = true;
            var postapp = this;
            $.ajax({
                method: "get",
                url: '/data/posts/'+postapp.$route.params.url+'.meta',
                contentType: "text/plain",
                success: function (data, status) {
                    postapp.meta = JSON.parse(data);
                },
                error: function (data, status) {
                    postapp.meta=null;
                    postapp.error=status;
                    console.log(status);
                }
            });
            $.ajax({
                method: "get",
                url: '/data/posts/'+postapp.$route.params.url,
                contentType: "text/plain",
                success: function (data, status) {
                    postapp.post = data;
                    postapp.loading = false;
                },
                error: function (data, status) {
                    postapp.post=null;
                    postapp.error=status;
//                    router.push({name:"error"});
                    console.log(status);
                }
            });

        }
    }
}
</script>

<style>

</style>