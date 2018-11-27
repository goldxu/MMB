$(function () {
  let pageId = 1;
  let categotyId = 0;
  var productList =new Product(categotyId,pageId);
  productList.getProductList();
  productList.getNext();
  productList.getLast()
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
})

class Product {
  constructor(categotyId, pageId ) {
    this.categotyId = categotyId;
    this.pageId = pageId;
  }
  //获取prodcutList
  getProductList() {
    let that =this;
    $.ajax({
      url: "http://localhost:9090/api/getproductlist",
      type: "get",
      dataType: "json",
      data: {categoryid: this.categotyId, pageid: this.pageId},
      success(data) {
        var productHtml = template("productListTpl", data);
        $(".product-list-content ul ").html(productHtml);
        that.maxPage = Math.ceil(data.totalCount/data.pagesize) ;
      }
    })
  }
  //下一页
  getNext() {
    let that = this;
    $(".after").on("tap", function () {
      that.pageId++;
      if (that.pageId >that.maxPage) {
        mui.toast( "已经是最后一页了", { duration:'short', type:'div' })
        that.pageId =that.maxPage;
        return false;
      }
      that.getProductList();
    })
  }
  //上一页
  getLast(){
    let that = this;
    $(".before").on("tap", function () {
      that.pageId--;
      if (that.pageId < 1) {
        mui.toast( "已经是第一页了", { duration:'short', type:'div' })
        that.pageId =1;
        return false;
      }
      that.getProductList();
    })
  }
}
  


