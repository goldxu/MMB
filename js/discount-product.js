$(function(){

    function GetQueryString(name) {
        //获取url的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]);
        return null;
    }

    var productId = GetQueryString('productid');
    console.log(productId);
    
    $.ajax({
        url:'http://localhost:9090/api/getdiscountproduct',
        data:{
            productid:productId
        },
        success:function(data){
            console.log(data);
            var html =template('productTpl',data);
            $('#main .section').html(html);
        }


        
    })

    // $.ajax({
    //     url:'http://localhost:9090/api/getdiscountproduct',
    //     data:{
    //         productid:productId
    //     },
    //     success:function(data){
    //         console.log(data);
    //         var html =template('commentTpl',data);
    //         $('.comment').html(html);
    //     }
    // })
    // mui('.mui-scroll-wrapper').scroll({
    //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
   
})