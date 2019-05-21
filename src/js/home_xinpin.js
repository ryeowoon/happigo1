function xinPin(id) {
    var xinPin = new XinPin();
    xinPin.Init(id);
}

/***********************构造函数***********************/
function XinPin() {
    // 新品推荐商品列表
    this.oXinpinGoodsList = null;
    this.aXinPinGoodsListItem = null;
    this.oXinpinChangeBtn = null;
    this.oXinpinInfos = {
        "total": 0,
        "num": 4,
        "page": 1,
    }
}

/***********************init***********************/
XinPin.prototype.Init = function (id) {
    // 查找节点
    this.oXinpinGoodsList = document.getElementById(id);
    // 数据渲染
    this.InitHtml();
}


/***********************数据渲染***********************/
XinPin.prototype.InitHtml = function () {

    var _this = this;

    var obj = {
        "type": "get",
        "url": "api/home_xinpin.php",
        "data": "mark=xinpin&page=" + _this.oXinpinInfos.page + "&num=" + _this.oXinpinInfos.num,
        "success": function (str) {

            //数据渲染
            var arr = JSON.parse(str);

            var sHtml = arr.data.map(function (item) {

                return `
                    <li class="list_item" data-id="${item.id}">
                        <a class="list_item_inner" href="javascript:;">
                            <div class="item_pic">
                                <img src="images/${item.pic.split(",")[0]}" alt="#">
                            </div>
                            <div class="item_infos">
                                <p class="describe">${item.title1}</p>
                                <p class="name">${item.name}</p>
                            </div>
                            <div class="item_price">
                                <span class="current_price">￥${item.currentprice}</span>
                                <span class="origin_price">￥${item.originprice}</span>
                            </div>
                            <div class="item_border"></div>
                            <div class="item_mark">
                                <img src="images/06103868458139003.png" alt="#">
                            </div>
                        </a>
                    </li>
                `;

            }).join("");

            _this.oXinpinGoodsList.innerHTML = sHtml;

            //查找节点
            _this.InitNode();

            //事件绑定
            _this.InitEvent();

            //新品相关信息设置
            _this.oXinpinInfos.total = arr.total;
        }
    }
    ajax(obj);
}

/***********************查找节点***********************/
XinPin.prototype.InitNode = function () {
    //商品列表
    this.aXinPinGoodsListItem = this.oXinpinGoodsList.querySelectorAll(".list_item");
    console.log(this.aXinPinGoodsListItem);
    //换一批
    this.oXinpinChangeBtn = document.getElementById("xinpin_change_btn");

}

/***********************事件绑定***********************/
XinPin.prototype.InitEvent = function () {

    this.jumpPage();//跳转到商品详情页
    this.showNewGoods();//换一批 改变展示的商品

}

// 页面跳转
XinPin.prototype.jumpPage = function () {

    var _this = this;

    for (let i = 0; i < this.aXinPinGoodsListItem.length; i++) {
        this.aXinPinGoodsListItem[i].onclick = function () {
            location.href = "html/detail.html?item=" + this.getAttribute('data-id');
        }
    }

}
XinPin.prototype.showNewGoods = function () {
    var _this = this;

    this.oXinpinChangeBtn.onclick = function () {
        // console.log(this);
        // console.log(_this.aXinPinGoodsListItem);

        _this.oXinpinInfos.page++;//当前页码加1

        var iPageNum = Math.ceil(_this.oXinpinInfos.total / _this.oXinpinInfos.num);//总页数
        if (_this.oXinpinInfos.page > iPageNum) {//临界判断
            _this.oXinpinInfos.page = 1;
        }
        
        var obj = {
            "type": "get",
            "url": "api/home_xinpin.php",
            "data": "mark=xinpin&page=" + _this.oXinpinInfos.page + "&num=" + _this.oXinpinInfos.num,
            "success": function (str) {

                //数据渲染
                var arr = JSON.parse(str);

                var sHtml = arr.data.map(function (item) {

                    return `
                        <li class="list_item" data-id="${item.id}">
                            <a class="list_item_inner" href="javascript:;">
                                <div class="item_pic">
                                    <img src="images/${item.pic.split(",")[0]}" alt="#">
                                </div>
                                <div class="item_infos">
                                    <p class="describe">${item.title1}</p>
                                    <p class="name">${item.name}</p>
                                </div>
                                <div class="item_price">
                                    <span class="current_price">￥${item.currentprice}</span>
                                    <span class="origin_price">￥${item.originprice}</span>
                                </div>
                                <div class="item_border"></div>
                                <div class="item_mark">
                                    <img src="images/06103868458139003.png" alt="#">
                                </div>
                            </a>
                        </li>
                    `;

                }).join("");

                _this.oXinpinGoodsList.innerHTML = sHtml;
                _this.aXinPinGoodsListItem = _this.oXinpinGoodsList.querySelectorAll(".list_item");
                _this.jumpPage();
                // console.log(_this.aXinPinGoodsListItem);
             
            }
        }
        ajax(obj);

    }
}

