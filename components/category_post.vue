<template>
    <div class="view-category-post">
        <div>分类：{{ catename }}</div>
        <div>
            <div is="PostListItem"
                 v-for="post in post_list"
                 :title="post.title"
                 :url="post.url"
                 :tags="post.tags"
                 :category="post.category"
                 :time="post.time"></div>
        </div>
    </div>
</template>

<script>
    import PostListItem from './post_list_item.vue'

    export default {
        data(){
            return {
                catename:"",
                post_list:[]
            }
        },
        methods: {
            catepostInit () {
                setpageloading();
                this.fetchData();
            },
            fetchData(){
                setpageloading();
                var catepostapp = this;
                var listurl = "/data/list/category/"+this.$route.params.key.toString();
                $.ajax({
                    url: listurl,
                    contentType: "text/plain",
                    method: "get",
                    success: function (data) {
                        var datajson = JSON.parse(data);
                        catepostapp.post_list = datajson[1];
                        catepostapp.catename = datajson[0]['name'];
                        setpageloaded();
                    },
                    error: function (err) {
                        console.log(err);
                        setpageloaded();
                    }
                })
            }
        },
        components: {
            PostListItem
        },
        created () {
            this.catepostInit();
        },
        watch: {
            '$route': 'catepostInit'
        }
    }
</script>