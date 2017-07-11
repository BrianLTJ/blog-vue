<template>
    <div>
        <div v-for="item in archive_list">
            <div v-if="item.type == 'label'">
                <div is="PostListLabel" :text="item.text"></div>
            </div>
            <div v-else>
                <div is="PostListItemMini"
                     :title="item.title"
                     :url="item.url"
                     :tags="item.tags"
                     :category="item.category"
                     :time="item.time"></div>

            </div>
        </div>
    </div>
</template>
<script>
    import PostListItemMini from './post_list_item_mini.vue'
    import PostListLabel from './post_list_label.vue'
    export default {
        data () {
            return {
                archive_list:[]
            }
        },
        methods: {
            archiveInit () {
                setpageloading();
                showMaxHeader();
                setHeaderTitles("Archives","");
                this.fetchArchiveList();
            },
            fetchArchiveList () {
                var archiveapp = this;

                $.ajax({
                    method: 'get',
                    url: '/data/list/archivelist',
                    contentType: 'plain/text',
                    success: function (data) {
                        archiveapp.archive_list=JSON.parse(data);
                        setpageloaded();
                    },
                    error: function (err) {
                        setpageloaded();
                        console.log(err);
                    }
                })
            }
        },
        components: {
            PostListItemMini,
            PostListLabel
        },
        watch : {
            "$route":"archiveInit"
        },
        created (){
            this.archiveInit();
        }
    }
</script>