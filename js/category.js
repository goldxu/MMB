$(function(){
    var mmb = new Mmb();
    mmb.queryCategory();
    //mmb.queryCategoryList();
    //��ʼ���������
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006});
    });
//mui���a��ǩ�޷���ת��ί���¼�
    mui('#main').on('tap','a',function(){
        console.log(this);
        window.top.location.href=this.href;
    });

});

    var Mmb = function(){};
    Mmb.prototype = {
        index : 0,
        //��ȡ�����
        queryCategory:function(){
            var that = this;
            $.ajax({
                url:"http://localhost:9090/api/getcategorytitle",
                dataType:'json',
                success:function(result){
                    var html = template('categoryTitleTpl',result);
                    $('.categoryContent').html(html);
                    //������Ⱦ��ȡ��ÿһ��������id�������б������
                    for(i=0;i<result.result.length;i++){
                        titleid =  result.result[i].titleId;
                        that.queryCategoryList(titleid);

                    }

                }
            })

        },
        //��ȡС����
        queryCategoryList:function(titleid){
            var that =this;
            console.log(titleid);
            $.ajax({
                url:"http://localhost:9090/api/getcategory",
                data:{titleid:titleid},
                dataType:'json',
                success:function(data){//data�Ǹ�����
                    //console.log(data);//data={result: Array(10)}   data.result=10������  each data.result value= ÿ��������Ķ��� value.id=id
                    //var html = template('categoryTitleTpl',data.result);

                    var html = template('categoryListTpl',{'result':data.result});//ֱ��ȡ������������ݣ��õ�ģ�������

                    //console.log(html);//���з��࣬8��
                    //$('.productList').html(html);
                    //var pp = $('.productList').html();//8������ȫ���ӽ�С���࣬���ǣ�ȡ���һ�Σ����ݲ�����Ҫ��
                    //console.log(pp);

                    $('.productList')[that.index].innerHTML=html;
                    that.index++;//ÿ�������++�������ٴθ���
                }
            })
        }
    }