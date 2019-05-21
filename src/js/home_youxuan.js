function youXuan(id) {
    var youXuan = new YouXuan();
    youXuan.Init(id);
}

/***********************构造函数***********************/
function YouXuan() {
    this.oYouXuanGoodsList = null;
    this.aYxGoodsListItem = null;
    this.oEndLine = null;//结束线
    this.oLoadBtn = null;

    this.oYxGoodsInfos = {
        'total': 0,
        'page': 1,
        'num': 8,
        'pageNum': 0,
        "isok": true
    }
}

/***********************init***********************/
YouXuan.prototype.Init = function (id) {
    this.oYouXuanGoodsList = document.getElementById(id);
    this.InitHtml();
}

/***********************数据渲染***********************/
YouXuan.prototype.InitHtml = function () {
    var _this = this;
    var obj = {
        "type": "get",
        "url": "api/home_youxuan.php",
        "data": "mark=youxuan&page=" + _this.oYxGoodsInfos.page + "&num=" + _this.oYxGoodsInfos.num,
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



            _this.oYouXuanGoodsList.innerHTML = sHtml;

            //查找节点
            _this.InitNode();

            //事件绑定
            _this.InitEvent();

            _this.oYxGoodsInfos.total = arr.total;
            _this.oYxGoodsInfos.pageNum = Math.ceil(arr.total / 8);


        }
    }
    ajax(obj);
}

/***********************查找节点***********************/
YouXuan.prototype.InitNode = function () {
    this.aYxGoodsListItem = this.oYouXuanGoodsList.querySelectorAll('.list_item');
    this.oEndLine = document.getElementById("end_line");
    this.oLoadBtn = document.getElementById("load_btn");

}

/***********************事件绑定***********************/
YouXuan.prototype.InitEvent = function () {

    this.jumpPage();//跳转到商品详情页
    this.loadGoods();//懒加载

}
YouXuan.prototype.jumpPage = function () {
    var _this = this;
    for (let i = 0; i < this.aYxGoodsListItem.length; i++) {
        this.aYxGoodsListItem[i].onclick = function () {
            location.href = "html/detail.html?item=" + this.getAttribute('data-id');
        }
    }
}
YouXuan.prototype.loadGoods = function () {
    var _this = this;
    document.onscroll = function () {
        var iScrollH = window.scrollY;//垂直方向的滚动距离 相对于浏览器窗口最顶部
        var iH = _this.oYouXuanGoodsList.offsetTop + _this.oYouXuanGoodsList.offsetHeight - window.innerHeight -600;

        if (iScrollH >= iH) {
            // console.log('12222');
            // 判断是否达到最后一页
            console.log(_this.oYxGoodsInfos.pageNum);
            console.log(_this.oYxGoodsInfos.page);

            if (_this.oYxGoodsInfos.pageNum == _this.oYxGoodsInfos.page) {
                _this.oLoadBtn.style.display = "none";
                _this.oEndLine.style.display = "block";
                return;
            }

            _this.oLoadBtn.style.display = "block";

            if (_this.oYxGoodsInfos.isok) {

                _this.oYxGoodsInfos.isok = false;
                _this.oYxGoodsInfos.page++;


                setTimeout(function () {
                    _this.oLoadBtn.style.display = "none";
                    var obj = {
                        "type": "get",
                        "url": "api/home_youxuan.php",
                        "data": "mark=youxuan&page=" + _this.oYxGoodsInfos.page + "&num=" + _this.oYxGoodsInfos.num,
                        "success": function (str) {

                            //数据渲染
                            var arr = JSON.parse(str);

                            var sHtml = arr.data.map(function (item) {

                                var sHtml2 = `
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
                                `;

                                var node = document.createElement("li");
                                node.setAttribute('class', 'list_item');
                                node.setAttribute('data-id', item.id);
                                node.innerHTML = sHtml2;
                                _this.oYouXuanGoodsList.appendChild(node);

                                _this.aYxGoodsListItem = _this.oYouXuanGoodsList.querySelectorAll(".list_item");
                                _this.jumpPage();

                            }).join("");

                            _this.oYxGoodsInfos.isok = true;
                        }
                    }
                    ajax(obj);

                }, 1000);
            }

        }

    }
}