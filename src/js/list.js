function list() {
    var list = new List();
    list.Init();
}

/****************************构造函数****************************/
function List() {

    //搜索词
    this.oLocationBox = null;

    //排序  
    this.oDefaultBtn = null;
    this.oPriceBtn = null;
    this.oSaleBtn = null;
    this.oDefaultIcon = null;
    this.oPriceIcon = null;
    this.oSaleIcon = null;

    //商品列表
    this.oGoodsList = null;
    this.aGoodsLis = null;

    this.oSaleInfos = {
        "asc": true
    };

    this.oUrlInfos = {
        "act": "onclik",
        "op": "index"
    }
    this.aGoodsData = [];//商品数据
}

/****************************Init****************************/
List.prototype.Init = function () {
    //查找元素节点
    this.oLocationBox = document.getElementById("location_box");//搜索词标题栏  首页>个护美妆>面部护理>面膜
    this.oGoodsList = document.getElementById("goods_list");//商品列表
    //数据渲染
    this.InitHtml();
}

//数据渲染
List.prototype.InitHtml = function () {
    var _this = this;
    //获取地址栏信息并处理
    var sUrl = decodeURI(location.search);
    var str = sUrl.split('?')[1];
    var oUrlInfos1 = strToObj(str);

    extend(this.oUrlInfos, oUrlInfos1);

    //根据关键词搜索请求数据
    var configObj = {
        "type": "get",
        "url": "../api/list.php",
        "data": 'keyword=' + _this.oUrlInfos.keyword,
        "success": function (str1) {

            /******************数据渲染*********************/
            //获取数据
            var arr = JSON.parse(str1);

            //标题栏 数据渲染
            if (_this.oUrlInfos.act = "onclick") {//点击分类列表获取数据
                _this.oLocationBox.innerHTML = `
                <a href="javascript:;" class="home_btn">首页</a>
                <span>&gt;</span>
                <a href="javascript:;">${arr[0].type1}</a>
                <span>&gt;</span>
                <a href="javascript:;">${arr[0].type2}</a>
                <span>&gt;</span>
                <a href="javascript:;">${_this.oUrlInfos.keyword}</a>               
                `;
            } else if (_this.oUrlInfos.act = "search") {//点击搜索按钮 或者关键字获取数据
                _this.oLocationBox.innerHTML = `
                <a href="javascript:;" class="home_btn">首页</a>
                <span>&gt;</span>
                <span>搜索 "${_this.oUrlInfos.keyword}"</sapn>
                `;
            }

            //商品列表 数据渲染
            var sHtml = arr.map(function (item) {
                return `
                <li class="list_item" data-id="${item.id}">
                    <div class="list_item_inner" href="javascript:;">
                        <a class="item_pic">
                            <img src="../images/${item.pic.split(",")[0]}" alt="#">
                        </a>
                        <div class="item_infos">
                            <div class="price">
                                <span class="current_price">￥${item.currentprice}</span>
                                <span class="origin_price">￥${item.originprice}</span>
                            </div>
                            <a class="name">${item.name}</a>
                        </div>
                    </div>
                    <div class="item_mark">
                        <img src="../images/06103868458139003.png" alt="#">
                    </div>
                </li>   
                `;
            }).join("");

            _this.oGoodsList.innerHTML = sHtml;
            //商品列表li
            _this.aGoodsLis = _this.oGoodsList.querySelectorAll('.list_item');


            /******************查找节点*********************/
            _this.InitNode();

            /******************事件绑定*********************/
            _this.InitEvent();

        }
    }
    ajax(configObj);

}

//查找节点
List.prototype.InitNode = function () {


    //排序
    this.oDefaultBtn = document.getElementById('default_btn');
    this.oPriceBtn = document.getElementById('price_btn');
    this.oSaleBtn = document.getElementById('sale_btn');
    this.oDefaultIcon = document.getElementById('default_icon');
    this.oPriceIcon = document.getElementById('price_icon');
    this.oSaleIcon = document.getElementById('sale_icon');

}

//事件绑定
List.prototype.InitEvent = function () {
    this.sortByDefault();//按照默认排序
    this.sortByPrice();//按照价格排序
    this.sortBySale();//按照销量排序
    this.jumpToDetailFromList();//页面跳转
}

//页面跳转
List.prototype.jumpToDetailFromList = function () {
    console.log(this.aGoodsLis);
    var _this = this;
    for (let i = 0; i < this.aGoodsLis.length; i++) {
        this.aGoodsLis[i].onclick = function () {

            // console.log(this);
            location.href = "detail.html?item=" + _this.aGoodsLis[i].getAttribute('data-id');
        }
    }
}

//按照默认排序
List.prototype.sortByDefault = function () {
    var _this = this;

    this.oDefaultBtn.onclick = function () {

        //图标样式
        _this.oDefaultIcon.className = "default_icon_active";
        _this.oPriceIcon.className = "price_icon";
        _this.oSaleIcon.className = "sale_icon";

        //根据关键词搜索请求数据
        var configObj = {
            "type": "get",
            "url": "../api/list.php",
            "data": 'keyword=' + _this.oUrlInfos.keyword,
            "success": function (str1) {

                /******************数据渲染*********************/
                //获取数据
                var arr = JSON.parse(str1);

                //商品列表 数据渲染
                var sHtml = arr.map(function (item) {
                    return `
                <li class="list_item" data-id="${item.id}">
                    <div class="list_item_inner" href="javascript:;">
                        <a class="item_pic">
                            <img src="../images/${item.pic.split(",")[0]}" alt="#">
                        </a>
                        <div class="item_infos">
                            <div class="price">
                                <span class="current_price">￥${item.currentprice}</span>
                                <span class="origin_price">￥${item.originprice}</span>
                            </div>
                            <a class="name">${item.name}</a>
                        </div>
                    </div>
                    <div class="item_mark">
                        <img src="../images/06103868458139003.png" alt="#">
                    </div>
                </li>   
                `;
                }).join("");
                console.log(_this.aGoodsLis);
                _this.oGoodsList.innerHTML = sHtml;
                //商品列表li
                _this.aGoodsLis = _this.oGoodsList.querySelectorAll('.list_item');
                _this.jumpToDetailFromList();


            }
        }
        ajax(configObj);

    }
}

//按照价格排序
List.prototype.sortByPrice = function () {
    var _this = this;
    this.oPriceBtn.onclick = function () {

        //图标样式
        _this.oDefaultIcon.className = "default_icon";
        _this.oPriceIcon.className = "price_icon_active";
        _this.oSaleIcon.className = "sale_icon";

        //根据关键词搜索请求数据
        var configObj = {
            "type": "get",
            "url": "../api/list.php",
            "data": 'keyword=' + _this.oUrlInfos.keyword + "&sortKey=currentprice&sortWay=DESC",
            "success": function (str1) {

                /******************数据渲染*********************/
                //获取数据
                var arr = JSON.parse(str1);

                //商品列表 数据渲染
                var sHtml = arr.map(function (item) {
                    return `
                    <li class="list_item" data-id="${item.id}">
                        <div class="list_item_inner" href="javascript:;">
                            <a class="item_pic">
                                <img src="../images/${item.pic.split(",")[0]}" alt="#">
                            </a>
                            <div class="item_infos">
                                <div class="price">
                                    <span class="current_price">￥${item.currentprice}</span>
                                    <span class="origin_price">￥${item.originprice}</span>
                                </div>
                                <a class="name">${item.name}</a>
                            </div>
                        </div>
                        <div class="item_mark">
                            <img src="../images/06103868458139003.png" alt="#">
                        </div>
                    </li>   
                    `;
                }).join("");

                _this.oGoodsList.innerHTML = sHtml;
                //商品列表li
                _this.aGoodsLis = _this.oGoodsList.querySelectorAll('.list_item');

                _this.jumpToDetailFromList();


            }
        }
        ajax(configObj);

    }
}

//按照销量排序
List.prototype.sortBySale = function () {
    var _this = this;

    this.oSaleBtn.onclick = function () {

        var sortWay = null;//存储排序方式

        if (_this.oSaleInfos.asc) {
            console.log("销量由底到高");
            //图标样式
            _this.oDefaultIcon.className = "default_icon";
            _this.oPriceIcon.className = "price_icon";
            _this.oSaleIcon.className = "sale_icon_asc";

            sortWay = "ASC";
            _this.oSaleBtn.style.backgroundPosition = "-220px -640px";
            _this.oSaleInfos.asc = false;

        } else {
            console.log("销量由高到低");
            //图标样式
            _this.oDefaultIcon.className = "default_icon";
            _this.oPriceIcon.className = "price_icon";
            _this.oSaleIcon.className = "sale_icon_desc";

            sortWay = "DESC";
            _this.oSaleBtn.style.backgroundPosition = "-288px -653px";
            _this.oSaleInfos.asc = true;
        }


        //根据关键词搜索请求数据
        var configObj = {
            "type": "get",
            "url": "../api/list.php",
            "data": 'keyword=' + _this.oUrlInfos.keyword + "&sortKey=sale&sortWay=" + sortWay,
            "success": function (str1) {

                /******************数据渲染*********************/
                //获取数据
                var arr = JSON.parse(str1);

                //商品列表 数据渲染
                var sHtml = arr.map(function (item) {
                    return `
                    <li class="list_item" data-id="${item.id}">
                        <div class="list_item_inner" href="javascript:;">
                            <a class="item_pic">
                                <img src="../images/${item.pic.split(",")[0]}" alt="#">
                            </a>
                            <div class="item_infos">
                                <div class="price">
                                    <span class="current_price">￥${item.currentprice}</span>
                                    <span class="origin_price">￥${item.originprice}</span>
                                </div>
                                <a class="name">${item.name}</a>
                            </div>
                        </div>
                        <div class="item_mark">
                            <img src="../images/06103868458139003.png" alt="#">
                        </div>
                    </li>   
                    `;
                }).join("");

                _this.oGoodsList.innerHTML = sHtml;
                //商品列表li
                _this.aGoodsLis = _this.oGoodsList.querySelectorAll('.list_item');

                _this.jumpToDetailFromList();
                console.log(_this.aGoodsLis);


            }
        }
        ajax(configObj);

    }
}