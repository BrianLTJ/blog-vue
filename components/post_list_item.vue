<template>
    <div class="post-item">
        <span class="post-item-lefthoverbar"></span>
        <router-link class="waves-effect waves-light" :to="{name:'postDetail',params: {url: url }}">
            <div class="title">{{ title }}</div>
        </router-link>
        <div class="post-info">
            <span class="time">{{ time }}</span>
            <span class="cate-item" v-for="cate in category">@{{ cate }}</span>
            <span class="tag-item" v-for="tag in tags">#{{ tag }}</span>
        </div>

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