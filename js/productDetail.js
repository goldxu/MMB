$(function () {
  let productId = getQueryString("productId");
  $.ajax({
    url : "http://localhost:9090/api/getproduct",
    data : {productid :productId},
    success : function (data) {
      let productDetail = template("productDetailTpl",data.result[0]);
      $(".product-detail ").html(productDetail);
      $.ajax({
        url: "http://localhost:9090/api/getcategorybyid",
        type: "get",
        dataType: "json",
        data: {categoryid: data.result[0].categoryId},
        success(obj) {
          $(".reback .categoty").html(obj.result[0].category).data("id",obj.result[0].categoryId);
        }
      })
    }
  })
  $.ajax({
    url : "http://localhost:9090/api/getproductcom",
    data : {productid :productId},
    success : function (data) {
      let comment = template("commentTpl",data);
      $(".comments").html(comment);
    }
  })
  $(".reback .categoty").on("tap",function () {
    let categoryId = $(this).data("id");
    console.log(categoryId);
    location.href = "productList.html?categoryId="+categoryId;
  })
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
})
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}