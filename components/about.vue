<template>
    <div class="view-about">
        About ME
    </div>

</template>

<script>
    export default {
        created (){
            this.aboutInit();
        },
        watch:{
            "$route":"aboutInit"
        },
        methods: {
            aboutInit () {
                setpageloading();
                showMaxHeader();
                setHeaderTitles("About Me");
                setpageloaded();
            }
        }
    }
</script>