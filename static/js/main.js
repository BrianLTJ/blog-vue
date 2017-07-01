var blogapp = new Vue({
    el: "#content",
    data: {
        post_list:[],
        post:{
            title:"",
            author:"",
            time:"",
            category:"",
            tags:[],
            text:""
        }
    },
    methods: {
        fetch_list: function(){
            $.ajax({
                method: "get",
                url: '/posts/list',
                contentType: "text/plain",
                success: function (data,status) {
                            blogapp.$data['post_list']=JSON.parse(data);
                        }
            });
        }
    },
    mounted: function () {
        $(document).ready(function () {
            blogapp.fetch_list();
        });

    }
});

function router_hide(ctx,next) {
    $(".router-page").each(function () {
        if($(this).hasClass('hide')){
        }else{
            $(this).addClass('hide');
        }
        next();
    });
}
function router_index() {
    // if($(this).hasClass('hide')){
    //     $(this).removeClass('hide');
    // }
    console.log('index');
    $("#router-index").removeClass('hide');
};

function router_post() {
    // if($(this).hasClass('hide')){
    //     $(this).removeClass('hide');
    // }
    console.log('post');
    $("#router-post").removeClass('hide');
};

function router_default(ctx, next) {
    // if($(this).hasClass('hide')){
    //     $(this).removeClass('hide');
    // }
    console.log('default')
    $("#router-default").removeClass('hide');
    next();
}
// page('/*', router_hide);
page('/',router_hide , router_index);
page('/post/:url',router_hide , router_post);
// page('*',router_hide , router_default);
page();

// page('/post/:url', router_hide, router_post);
// page('*', router_hide, router_default);
// page();