function detail(id) {
    var detail = new Detail();
    detail.Init(id);
}

/*******************************构造函数*******************************/
function Detail() {
    // 搜索词 
    this.oLocationBox = null;

    // 详情box
    this.oDetailBox = null;

    //按钮 上一张 下一张
    this.oPicList = null;
    this.aPicListItem = null;
    this.oPrevBtn = null;
    this.oNextBtn = null;

    // 减少 添加 数量输入框 加入购物车
    this.oReduceBtn = null;//减少
    this.oAddBtn = null;//增加
    this.oPurchaseQuanlityInput = null;
    this.oAddGoodsToCartBtn = null;

    // 其他
    this.oGoodsInfos = [];

    this.oGoodsPic = {
        "num": 0
    }

}

/*******************************Init*******************************/
Detail.prototype.Init = function (id) {
    //查找节点
    this.oLocationBox = document.getElementById("location_box");
    this.oDetailBox = document.getElementById(id);
    // 数据渲染
    this.InitHtml();
}
/*******************************数据渲染*******************************/
Detail.prototype.InitHtml = function () {
    var _this = this;

    //处理地址栏信息
    var sUrl = decodeURI(location.search);
    var str = sUrl.split('?')[1];
    var obj = strToObj(str);

    var obj = {
        "type": "get",
        "url": "../api/detail.php",
        "data": 'id=' + obj.item,
        "success": function (str) {
            // 获取数据
            var arr = JSON.parse(str);
            _this.oGoodsInfos = arr[0];

            // 数据渲染 标题栏
            _this.oLocationBox.innerHTML = `
                <a href="javascript:;" class="home_btn">首页</a>
                <span>&gt;</span>
                <a href="javascript:;">${arr[0].type1}</a>
                <span>&gt;</span>
                <a href="javascript:;">${arr[0].type2}</a>
                <span>&gt;</span>
                <a href="javascript:;">${arr[0].type3}</a>  
                <span>&gt;</span>   
                <a href="javascript:;">${arr[0].name}</a>    
                `;
            //数据渲染 商品相关信息       
            var sHtml = arr.map(function (item) {

                var aPic = item.pic.split(",");

                _this.oGoodsPic.num = aPic.length;

                var sHtml1 = aPic.map(function (item1) {
                    return `
                    <li><img src="../images/${item1}" data-lsrc="../images/${item1}" data-maxSrc="../images/${item1}"></li>  
                    `;
                }).join("");

                return `
                    <div class="left fl">
                        <div id="MagnifierWrap2">
	                        <div class="MagnifierMain">
		                        <img class="MagTargetImg" src="../images/${aPic[0]}" data-src="../images/${aPic[0]}"> 
	                        </div>
	                        <span class="spe_leftBtn" id="prev_btn">&lt;</span>
	                        <span class="spe_rightBtn" id="next_btn">&gt;</span>
	                        <div class="spec-items"> 
                                <ul id="pic_list">
                                    ${sHtml1}
		                        </ul>
	                        </div>
                        </div>
                        <div class="goods_collect">
                            <dl class="number fl">
                                <dt>编码:</dt>
                                <dd id="serial_number">1234</dd>
                            </dl>
                            <div class="collect fl">
                                <a href="javascript:;">
                                    <i class="icon"></i>
                                    <span>收藏商品</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="right fl">
                        <h2 class="goods_name" id="goods_title">${item.name}</h2>
                        <p class="goods_describe" id="goods_describe">${item.title1}${item.name}</p>
                        <div class="goods_price">
                            <span class="price_title">快乐价</span>
                            <span class="current_price" id="current_price">${item.currentprice}</span>
                            <del class="origin_price" id="origin_price">${item.originprice}</del>
                        </div>
                        <div class="goods_freight">
                            <span class="freight_title">运费</span>
                            <span class="freight">包邮</span>
                        </div>
                        <div class="goods_feature">
                            <div class="color clearfix">
                                <span class="color_title">颜色</span>
                                <ul class="color_list clearfix">
                                    <li>
                                        <a href="javascript:;">默认</a>
                                        <b></b>
                                    </li>
                                </ul>
                            </div>
                            <div class="size clearfix">
                                <span class="size_title">尺码</span>
                                <ul class="size_list clearfix">
                                    <li>
                                        <a href="javascript:;">默认</a>
                                        <b></b>
                                    </li>
                                </ul>
                            </div>
                            <div class="num clearfix">
                                <span class="num_title">数量</span>
                                <div class="num_box">
                                    <a class="reduce" href="javascript:;" id="reduce_btn">-</a>
                                    <input class="num_input" type="number" id="purchase_quantity_input" value="1">
                                    <a class="add" href="javascript:;" id="add_btn">+</a>
                                </div>
                            </div>
                        </div>
                        <div class="cart_box">
                            <div class="cart">
                                <a class="buy" href="javascript:;">立即购买</a>
                                <a class="add_cart" href="javascript:;" id="add_cart">加入购物车</a>
                            </div>
                            <p class="prompt_msg">购买最多可以获 2.5 快乐币（抵现金额 2.5 元） 直播商品在线实付满199减10元</p>
                        </div>
                    </div>
                `;
            }).join("");

            _this.oDetailBox.innerHTML = sHtml;

            // 查找节点
            _this.InitNode();

            //事件绑定
            _this.InitEvent();

        }
    }

    ajax(obj);
}


/*******************************查找节点*******************************/
Detail.prototype.InitNode = function () {
    //按钮
    this.oPicList = document.getElementById("pic_list");
    this.aPicListItem = this.oPicList.querySelectorAll("li");

    this.oPrevBtn = document.getElementById("prev_btn");
    this.oNextBtn = document.getElementById("next_btn");

    this.oReduceBtn = document.getElementById('reduce_btn');//减少
    this.oAddBtn = document.getElementById('add_btn');//增加
    this.oPurchaseQuanlityInput = document.getElementById('purchase_quantity_input');
    this.oAddGoodsToCartBtn = document.getElementById('add_cart');
    console.log(this.oPicList);

}


/*******************************事件绑定*******************************/
Detail.prototype.InitEvent = function () {
    this.amplification();//放大镜
    this.getPrev();//获取上一张
    this.getNext();//获取下一张
    this.setNumInput();//设置购买数量
    this.reduceGoods();//减少商品
    this.addGoods();//添加商品
    this.addToCart();//加入购物车

}

//放大镜
Detail.prototype.amplification = function () {
    // this.oGoodsBigPicBox.onmousemove = function () {

    // }
}

//获取上一张
Detail.prototype.getPrev = function () {
    var _this = this;

    this.oPrevBtn.onclick = function () {

        var iPicNum = _this.oGoodsPic.num;//商品图片的数量

        if (iPicNum <= 5) {//数量太少
            return;
        }

        var iTotalNum = iPicNum - 5;//可以移动的商品数量


        if (parseInt(_this.oPicList.offsetLeft - 23) <= (- iTotalNum * 66)) {
            return;
        }

        var l = _this.oPicList.offsetLeft - 66;

        startMove(_this.oPicList, { "left": l });//开始移动
    }
}

//获取下一张
Detail.prototype.getNext = function () {
    var _this = this;

    this.oNextBtn.onclick = function () {
        var iPicNum = _this.oGoodsPic.num;//商品图片的数量

        if (iPicNum <= 5) {//数量太少
            return;
        }

        var iTotalNum = iPicNum - 5;//可以移动的商品数量


        if (parseInt(_this.oPicList.offsetLeft) > 23) {
            return;
        }

        var l = _this.oPicList.offsetLeft + 66;

        startMove(_this.oPicList, { "left": l });//开始移动

    }
}
//设置购买数量
Detail.prototype.setNumInput = function () {
    var _this = this;

    //释放键盘按键
    this.oPurchaseQuanlityInput.onkeyup = function () {
        //获取输入框输入值
        var sValue = this.value;
        // 正则处理 对输入只保留数字部分
        this.value = sValue.replace(/[^0-9]/ig, "");
    }
    // 失去焦点
    this.oPurchaseQuanlityInput.onblur = function () {
        // 获取输入框输入值
        var sValue = this.value;

        // 对输入的数值进行正则处理 去掉前面n个0
        sValue = sValue.replace(/^[0]+/, "");
        console.log(sValue);

        // 非空判断 为空 置1
        if (trim(sValue)) {
            this.value = 1;
            return;
        }

        // 数值大小判断
        var iStockNum = parseInt(_this.oGoodsInfos.stocknum);//库存量

        if (sValue >= iStockNum) {
            sValue = iStockNum - 1;
            alert("当前库存不足，最多可购买" + sValue + "件！");
        }

        this.value = sValue;

    }

}

// 减少商品
Detail.prototype.reduceGoods = function () {
    var _this = this;
    //减少
    this.oReduceBtn.onclick = function () {
        // 获取输入框输入值
        var sValue = _this.oPurchaseQuanlityInput.value;
        // 输入值减1
        sValue = sValue - 1;

        if (sValue < 1) {//临界判断
            sValue = 1;
        }

        _this.oPurchaseQuanlityInput.value = sValue;
    }
}

// 添加商品
Detail.prototype.addGoods = function () {
    var _this = this;
    //添加
    this.oAddBtn.onclick = function () {
        // 获取输入框输入值
        var sValue = _this.oPurchaseQuanlityInput.value;
        // 输入值加1
        sValue = parseInt(sValue) + 1;
        // 临界判断
        var iStockNum = parseInt(_this.oGoodsInfos.stocknum);//库存量

        if (sValue >= iStockNum) {//临界判断
            sValue = iStockNum - 1;
        }

        _this.oPurchaseQuanlityInput.value = sValue;
    }

}

// 添加到购物车
Detail.prototype.addToCart = function () {

    var _this = this;

    this.oAddGoodsToCartBtn.onclick = function () {

        // 获取Cookie值
        var sUserName = getCookie('username');

        // 判断Cookie值是否存在
        if (sUserName) {

            var goodsid = _this.oGoodsInfos.id;
            var goodsname = _this.oGoodsInfos.name;
            var goodspic = _this.oGoodsInfos.pic.split(",")[0];
            var originprice = _this.oGoodsInfos.originprice;
            var currentprice = _this.oGoodsInfos.currentprice;
            var stocknum = _this.oGoodsInfos.stocknum;
            var num = _this.oPurchaseQuanlityInput.value;

            var obj = {
                "type": "get",
                "url": "../api/detail_addCart.php",
                "data": "username=" + sUserName + "&goodsid=" + goodsid + "&goodsname=" + goodsname + "&goodspic=" + goodspic + "&originprice=" + originprice + "&currentprice=" + currentprice + "&stocknum=" + stocknum + "&num=" + num,
                "success": function (str) {
                    console.log(str);
                    if (str == "yes") {
                        alert("添加成功！");
                        return;
                    }
                    if (str == "no") {
                        alert("添加失败！");
                        return;
                    }
                }
            }
            ajax(obj);

        } else {
            location.href = "login.html";
        }

    }

}


