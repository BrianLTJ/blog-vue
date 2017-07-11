<template>
    <div class="view-post">
        <div class="post-info">
            <div class="post-cate-tag">
                <router-link :to="{name:'categoryPostList',params:{mode:'name',key:cate}}" class="post-cate-tag" v-for="cate in meta.category">@{{ cate }}</router-link>
                <router-link :to="{name:'tagPostList',params: {mode:'name',key:tag}}" class="post-cate-tag" v-for="tag in meta.tags">#{{ tag }}</router-link>
            </div>
        </div>
        <h1 id="post-title">{{ meta.title }}</h1>
        <div class="post-text" v-html="post"></div>
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
            setpageloading();
            showMediumHeader();
            this.fetchData();

        },
        fetchData () {
            this.post = null;
            var postapp = this;
            setpageloading();
            $.ajax({
                method: "get",
                url: urlAppendStamp('/data/posts/'+postapp.$route.params.url+'.meta'),
                contentType: "text/plain",
                success: function (data, status) {
                    postapp.meta = JSON.parse(data);;
                    setHeaderTitles(postapp.meta.title,postapp.meta.time.toString());
                },
                error: function (data, status) {
                    postapp.meta=null;
                    postapp.error=status;
                    console.log(status);
                    setHeaderTitles("","");
                }
            });
            $.ajax({
                method: "get",
                url: urlAppendStamp('/data/posts/'+postapp.$route.params.url),
                contentType: "text/plain",
                success: function (data, status) {
                    postapp.post = data;
                    setpageloaded();
                },
                error: function (data, status) {
                    postapp.post=null;
                    setpageloaded();
                    console.log(status);
                }
            });

        }
    }
}
</script>

<style>

</style>