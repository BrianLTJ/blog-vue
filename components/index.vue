<template>
    <div class="index">
        <div class="row">
            <div class="col s12 m9">
                <div class="blog-list">
                    <div is="PostListItem"
                         v-for="item in post_list"
                         :title="item.title"
                         :url="item.url"
                         :tags = "item.tags"
                         :category="item.category"
                         :time="item.time" >
                    </div>
                </div>
                <div class="blog-more">
                    <span class="blog-more-button">MORE</span>
                </div>
            </div>

            <div class="col s12 m3">
                <div>
                    <div>CATEGORY</div>
                    <div>

                        <router-link :to="{name:'categoryPostList',params:{mode:'name',key:cate.name}}" class="post-cate-tag" v-for="cate in cate_list">@{{ cate.name }}</router-link>
                    </div>
                </div>
                <div>
                    <div>TAG</div>
                    <div>
                        <router-link :to="{name:'tagPostList',params: {mode:'name',key:tag.name}}" class="post-cate-tag" v-for="tag in tag_list">#{{ tag.name }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostListItem from './post_list_item.vue'
    export default {
        data () {
            return {
                loading : false,
                post_list: [],
                cate_list:[],
                tag_list: []
            }
        },
        created () {
            this.indexInit();
            this.fetch_list();
        },
        methods: {
            indexInit () {
                setpageloading();
                showMaxHeader();
                showIndexHeader();
            },
            fetch_list () {
                var indexapp = this;
                var loaded = 0;
                $.ajax({
                    method: "get",
                    url: '/data/list/postlist',
                    contentType: "text/plain",
                    success: function (data,status) {
                        indexapp.post_list=JSON.parse(data);
                        loaded++;
                        if(loaded>=3) setpageloaded();
                    }
                });
                $.ajax({
                    method: "get",
                    url: '/data/list/catelist',
                    contentType: "text/plain",
                    success: function (data,status) {
                        indexapp.cate_list=JSON.parse(data);
                        loaded++;
                        if(loaded>=3) setpageloaded();
                    }
                });
                $.ajax({
                    method: "get",
                    url: '/data/list/taglist',
                    contentType: "text/plain",
                    success: function (data,status) {
                        indexapp.tag_list=JSON.parse(data);
                        loaded++;
                        if(loaded>=3) setpageloaded();
                    }
                });
            }
        },
        components: {
            PostListItem
        },
        watch: {
            '$route': 'fetch_list'
        }
    }
</script>