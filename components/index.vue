<template>
    <div>
        <h1>My Blog</h1>
        <div class="blog-list">
            <div v-for="item in post_list">
                <p>{{ item.title }}</p>
                <router-link :to="{name:'postDetail',params: {url: item.url }}">查看全文</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading : false,
                post_list: []
            }
        },
        created () {
            this.fetch_list();
        },
        methods: {
            fetch_list () {
                var indexapp = this;
                $.ajax({
                    method: "get",
                    url: '/data/postlist',
                    contentType: "text/plain",
                    success: function (data,status) {
                        indexapp.post_list=JSON.parse(data);
                    }
                });
            }
        },
        watch: {
            '$route': 'fetch_list'
        }
    }
</script>