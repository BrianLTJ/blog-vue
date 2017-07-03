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
                    cates
                </div>
                <div>
                    tags
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
                post_list: []
            }
        },
        created () {
            this.indexInit();
            this.fetch_list();
        },
        methods: {
            indexInit () {
                setpageloading();
                $("#header").addClass('header-max');
                $("#header").removeClass('header-medium header-small');
            },
            fetch_list () {
                var indexapp = this;
                $.ajax({
                    method: "get",
                    url: '/data/list/postlist',
                    contentType: "text/plain",
                    success: function (data,status) {
                        indexapp.post_list=JSON.parse(data);
                        setpageloaded();
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