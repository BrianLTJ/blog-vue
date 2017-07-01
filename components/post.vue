<template>
    <div>
        <div class="post-info">
            <h1 id="post-title">BlogTitle</h1>
            <div>url: {{ $route.params.url }}</div>
            <div>
                正文：
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
            error: null
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            this.post = null;
            this.loading = true;
            var postapp = this;
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
                    console.log(status);
                }
            })
        }
    }
}
</script>

<style>

</style>