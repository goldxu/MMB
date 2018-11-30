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
})
