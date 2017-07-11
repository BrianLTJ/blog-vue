<template>
    <div class="post-item-mini">
        <span class="post-item-lefthoverbar"></span>

        <router-link class="waves-effect waves-light" :to="{name:'postDetail',params: {url: url }}">
            <span class="post-time">{{ time }}</span>
            <span class="post-title">{{ title }}</span>
        </router-link>

    </div>
</template>

<script>
    export default {
        props: {
            "title":"",
            "url":"",
            "tags": null,
            "category": null,
            "time": ""
        }
    }
</script>