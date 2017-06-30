var blogapp = new Vue({
    el: "#content",
    data: {
        post_list:[]
    },
    methods: {
        fetch_list: function(){
            console.log("Fetch");
            $.ajax({
                method: "get",
                url: '/posts/list',
                contentType: "text/plain",
                dataType: "text/plain",
                success: function (data,status) {
                            console.log(status);
                            blogapp.$data['post_list']=JSON.parse(data);
                        }
            });
        }
    },
    mounted: function () {
        $(document).ready(function () {
            console.log("Ready");
            blogapp.fetch_list();
        });

    }
});
