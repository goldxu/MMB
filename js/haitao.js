$(function(){

    var xx=new Xx();
    xx.render();
    xx.optCreate();
    xx.optChange();
    xx.upClick();
    xx.downClick();
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
});
var Xx=function(){};
Xx.prototype={
    page:"",
    pages:"",
    
    render:function(page){
        $.ajax({
            url:"http://localhost:9090/api/getmoneyctrl",
            data:{pageid:page||0},
            success:function(data){
                console.log(data);
                
                var html=template("saveMoneyTpl",data);
                $("#main ul").html(html);
            }
        });
    },
    // 下拉框
    optCreate:function(){
        var that=this;
        $.ajax({
            url:"http://localhost:9090/api/getmoneyctrl",
            data:{pageid:0},
            success:function(data){
                that.pages=Math.ceil(data.totalCount/data.pagesize);
                var html=template("saveMoneyTplOp",{opt:Math.ceil(that.pages)});
                $("#select").html(html);
            }
        });
    },
    // 下拉框事件
    optChange:function(){
        var that=this;
        $("#select").on("change",function(){
            that.page=$("select").val();
            that.render(that.page-1);
        });
    },
    // 上一页点击事件
    upClick:function(){
        var that=this;
        $(".btn-up").on("tap",function(){
            that.page=$("select").val();
            if (that.page>1) {
                that.render(that.page-2);
                $("#select").val(that.page-1);
            }
        });
        return that;
    },
    // 下一页点击事件
    downClick:function(){
        var that=this;
        $(".btn-down").on("tap",function(){
            that.page=$("select").val();
            if (that.page<that.pages) {
                that.render(+that.page);
                $("select").val(+that.page+1);
            }
        });
    }
}