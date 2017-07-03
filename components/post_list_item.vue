<template>
    <div class="post-item">
        <span class="post-item-lefthoverbar"></span>
        <router-link class="waves-effect waves-light" :to="{name:'postDetail',params: {url: url }}">
            <div class="title">{{ title }}</div>
        </router-link>
        <div class="post-info">
            <span class="time">{{ time }}</span>
            <router-link :to="{name:'categoryPostList',params:{mode:'name',key:cate}}" class="cate-item" v-for="cate in category">@{{ cate }}</router-link>
            <router-link :to="{name:'tagPostList',params: {mode:'name',key:tag}}"  class="tag-item" v-for="tag in tags">#{{ tag }}</router-link>
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