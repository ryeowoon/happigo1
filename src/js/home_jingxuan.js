function jingXuan(id) {
    var jingXuan = new JingXuan();
    jingXuan.Init(id);
}

/***********************构造函数***********************/
function JingXuan() {
    this.oJingXuanGoodsBox = null;
    this.aJxGoodsListItem = null;
    this.aJxActivityPic = null;
}

/***********************init***********************/
JingXuan.prototype.Init = function (id) {
    // 查找元素节点
    this.oJingXuanGoodsBox = document.getElementById(id);
    // 数据渲染
    this.InitHtml();
    this.InitNode();
    this.InitEvent();

}

/***********************数据渲染***********************/
JingXuan.prototype.InitHtml = function () {
    var _this = this;
    var aBigPics = ['jx1.jpg', 'jx2.jpg', 'jx3.jpg', 'jx4.jpg', 'jx5.jpg'];
    var obj = {
        "type": "get",
        "url": "api/home_jingxuan.php",
        "data": 'activity1=个护美妆&activity2=服装配饰&activity3=食品健康&activity4=餐厨日用&activity5=布艺家纺',
        "success": function (str) {
            // 数据渲染
            var arr = JSON.parse(str);
            var oData = JSON.parse(str);
            var arr1 = Object.values(oData);
            var sHtml1 = arr1.map(function (item, index) {

                var sHtml = item.map(function (item1) {
                    return `
                        <li class="list_item" data-id="${item1.id}">
                            <a class="list_item_inner" href="javascript:;">
                                <div class="item_pic">
                                    <img src="images/${item1.pic.split(",")[0]}" alt="#">
                                </div>
                                <div class="item_infos">
                                    <p class="describe">${item1.title1}</p>
                                    <p class="name">${item1.name}</p>
                                </div>
                                <div class="item_price">
                                    <span class="current_price">￥${item1.currentprice}</span>
                                    <span class="origin_price">￥${item1.originprice}</span>
                                </div>
                                <div class="item_border"></div>
                                <div class="item_mark">
                                    <img src="images/06103868458139003.png" alt="#">
                                </div>
                            </a>
                        </li>
                    `;
                }).join("");

                return `
                    <div class="event_box">
                        <div class="activity_pic">
                            <a href="javascript:;">
                                <img src="images/${aBigPics[index]}" alt="#">
                            </a>
                        </div>
                        <ul class="goods_list clearfix" id="jx_activity_list2">${sHtml}</ul>
                    </div>              
                `;
            }).join('');

            _this.oJingXuanGoodsBox.innerHTML = sHtml1;

            //查找节点
            _this.InitNode();

            //事件绑定
            _this.InitEvent();

        }
    }

    ajax(obj);
}

/***********************查找节点***********************/
JingXuan.prototype.InitNode = function () {
    this.aJxGoodsListItem = this.oJingXuanGoodsBox.querySelectorAll('.list_item');
    this.aJxActivityPic = this.oJingXuanGoodsBox.querySelectorAll('.activity_pic');
}

/***********************事件绑定***********************/
JingXuan.prototype.InitEvent = function () {
    this.jumpActivityPage();//跳转到活动专场
    this.jumpGoodsDetailsPage();//跳转到商品详情页
}
//跳转到活动专场
JingXuan.prototype.jumpActivityPage = function () {
    var _this = this;
    for (let i = 0; i < this.aJxActivityPic.length; i++) {
        this.aJxActivityPic[i].onclick = function () {
            location.href = "html/activity.html?activity=" + i;
        }
    }
}
JingXuan.prototype.jumpGoodsDetailsPage = function () {
    var _this = this;
    for (let i = 0; i < this.aJxGoodsListItem.length; i++) {
        this.aJxGoodsListItem[i].onclick = function () {
            location.href = "html/detail.html?item=" + this.getAttribute('data-id');
        }
    }
}