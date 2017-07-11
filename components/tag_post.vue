<template>
    <div>
        <div class="view-category-post">
            <div>标签: {{ tagname }}</div>
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
    </div>
</template>
<script>
    import PostListItem from './post_list_item.vue'

    export default {
        data(){
            return {
                tagname: "",
                post_list: ""
            }
        },
        methods: {
            tagpostInit () {
                setpageloading();
                showMaxHeader();
                this.fetchData();
            },
            fetchData(){
                setpageloading();
                var tagpostapp = this;
                var listurl = "/data/list/tag/"+this.$route.params.key.toString();
                $.ajax({
                    url:  urlAppendStamp(listurl),
                    contentType: "text/plain",
                    method: "get",
                    success: function (data) {
                        var datajson = JSON.parse(data);
                        tagpostapp.post_list = datajson[1];
                        tagpostapp.tagname = datajson[0]['name'];
                        setHeaderTitles("# "+tagpostapp.tagname);
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
            this.tagpostInit();
        },
        watch: {
            '$route': 'tagpostInit'
        }
    }
</script>