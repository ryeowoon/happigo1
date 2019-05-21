function tvPlay(id) {
    var tvPlay = new TvPlay();
    tvPlay.Init(id);
}

/*************************************构造函数*************************************/
function TvPlay() {

    //按钮
    this.oPrevBtn = null;
    this.oNextBtn = null;

    //商品列表
    this.oTvGoodsList = null;
    this.aTvGoodsListItem = null;

    this.oTvInfos = {
        "num": 0,
        "moveNum": 0,
        "total": 0,
        "lMoveNum": 0,
        "rMoveNum": 0,
        "lTotal": 0,
        "rTotal": 0

    }


}

/*************************************Init*************************************/
TvPlay.prototype.Init = function (id) {
    //查找节点
    this.oTvGoodsList = document.getElementById(id);

    this.InitHtml();//数据渲染

}

/*************************************数据渲染*************************************/
TvPlay.prototype.InitHtml = function () {
    var _this = this;
    var obj = {
        "type": "get",
        "url": "api/home_tv.php",
        "data": "mark=tv",
        "success": function (str) {

            var arr = JSON.parse(str);

            //数据渲染
            var sHtml = arr.map(function (item) {
                return `
                    <li class="list_item" data-id="${item.id}">
                        <a href="javascript:;" class="list_item_inner">
                            <div class="item_pic">
                                <img src="images/${item.pic.split(",")[0]}" alt="#">
                            </div>
                            <div class="item_infos">
                                <h6 class="name">${item.name}</h6>
                                <div class="price">
                                    <div class="price_left">
                                        <span>￥${item.currentprice}</span>
                                        <del>￥${item.originprice}</del>
                                    </div>
                                    <span class="price_right">立即购买</span>
                                </div>
                            </div>
                        </a>
                    </li>
                `;
            }).join("");

            _this.oTvGoodsList.innerHTML = sHtml;
            _this.oTvInfos.num = arr.length;//商品总数
            _this.oTvGoodsList.style.width = (405 * _this.oTvInfos.num) + 'px';//ul宽
            _this.oTvInfos.lMoveNum = arr.length - 3;//可向左边移动的n个商品
            _this.oTvInfos.rMoveNum = 0;//可向右边移动0个商品
            _this.oTvInfos.lTotal = 0;
            _this.oTvInfos.rTotal = arr.length - 3;
            _this.oTvInfos.total = arr.length - 3;//向左向右，可移动的商品数

            console.log(_this.oTvInfos);

            //查找节点
            _this.InitNode();

            //事件绑定
            _this.InitEvent();

        }
    }
    ajax(obj);


}

/*************************************查找节点*************************************/
TvPlay.prototype.InitNode = function () {
    //商品列表
    this.aTvGoodsListItem = this.oTvGoodsList.querySelectorAll('.list_item');

    //按钮
    this.oPrevBtn = document.getElementById("prev_btn");
    this.oNextBtn = document.getElementById("next_btn");

}

/*************************************事件绑定*************************************/
TvPlay.prototype.InitEvent = function () {


    this.getPrev();//获取上一张
    this.getNext();//获取下一张
    this.jumpPage();//跳转到商品详情页

}

//页面跳转
TvPlay.prototype.jumpPage = function () {

    var _this = this;

    for (let i = 0; i < this.aTvGoodsListItem.length; i++) {
        this.aTvGoodsListItem[i].onclick = function () {
            location.href = "html/detail.html?item=" + this.getAttribute('data-id');
        }
    }
}


//获取上一张图片
TvPlay.prototype.getPrev = function () {

    var _this = this;

    this.oPrevBtn.onclick = function () {

        var iTotalNum = parseInt(_this.oTvInfos.total);//可移动的最大商品数    

        if (parseInt(_this.oTvGoodsList.offsetLeft) <= (- iTotalNum * 405)) {
            return;
        }

        var l = _this.oTvGoodsList.offsetLeft - 405;


        startMove(_this.oTvGoodsList, { "left": l });//开始移动


    }
}

//获取下一张图片
TvPlay.prototype.getNext = function () {
    var _this = this;

    this.oNextBtn.onclick = function () {

        var iTotalNum = parseInt(_this.oTvInfos.total);//可移动的最大商品数    

        console.log(_this.oTvGoodsList.offsetLeft);
        console.log(-iTotalNum * 405);

        if (parseInt(_this.oTvGoodsList.offsetLeft) >= 0) {
            return;
        }

        var l = _this.oTvGoodsList.offsetLeft + 405;

        startMove(_this.oTvGoodsList, { "left": l });//开始移动

    }
}


