function cart() {
    var cart = new Cart();
    cart.Init();
}

/************************构造函数***********************/
function Cart() {
    // 头部
    this.oLogoBtn = null;
    this.oUserNameBox = null;
    this.oQuitBtn = null;
    // cartbox
    this.oCartBox1 = null;
    this.oCartBox2 = null;

    // 购物车商品列表
    this.oGoodsList = null;
    this.aGoodsListItem = null;

    // 结算
    this.oGoodsTotalNum = null;
    this.oGoodsTotalPrice = null;

    // 全选
    this.oSelectAllBtn1 = null;
    this.oSelectAllBtn2 = null;
    this.oSelectAllBtn3 = null;
    this.aSelectBtn = null;

    // 减少 添加 删除 数量输入框
    this.aReduceBtn = null;
    this.aAddBtn = null;
    this.aDeleteBtn = null;
    this.aNumInput = null;
    this.aSameGoodsTotalPrice = null;
    this.aPrice = null;//单价

    // 结算
    this.oSettleAccountsBtn = null;

    // 立即购买
    this.oToBuyBtn = null;

    // 其他变量
    this.aGoodsInfos = [];

}

/************************init***********************/
Cart.prototype.Init = function () {

    // 查找元素节点
    this.oLogoBtn = document.getElementById("logo_btn");
    this.oUserNameBox = document.getElementById("username_box");
    this.oQuitBtn = document.getElementById("quit_btn");
    this.oCartBox1 = document.getElementById("cart_box1");
    this.oCartBox2 = document.getElementById("cart_box2");

    // 商品列表
    this.oGoodsList = document.getElementById('goods_list');

    // 结算
    this.oGoodsTotalNum = document.getElementById("goods_total_num");
    this.oGoodsTotalPrice = document.getElementById("goods_total_price");
    //购买
    this.oToBuyBtn = document.getElementById("to_buy_btn");
    console.log(this.oToBuyBtn);

    // 数据渲染
    this.InitHtml();
}

/************************数据渲染***********************/
Cart.prototype.InitHtml = function () {

    var _this = this;
    // 查询cookie获取用户名
    var sUserName = getCookie('username');
    this.oUserNameBox.innerHTML = "欢迎你，" + sUserName;

    // 请求数据
    var obj = {
        "type": "get",
        "url": "../api/cart.php",
        "data": "name=" + sUserName,
        "success": function (str) {
            console.log(str);

            // 获取数据
            var arr = JSON.parse(str);
            console.log(getCookie('username'));
            _this.aGoodsInfos = arr;

            // 判断用户的购物车是否有数据
            if (arr.length < 1) {
                _this.oCartBox2.style.display = "block";//空盒子显示
                _this.oCartBox1.style.display = "none";
                _this.buyGoods();
                _this.quitPage();
                _this.jumpHome();

                return;
            }

            _this.oCartBox2.style.display = "none";
            _this.oCartBox1.style.display = "block";

            var iTotalNum = 0;//商品件数
            var fTotalPrice = 0;//商品总价


            //数据渲染
            var sHtml = arr.map(function (item) {

                iTotalNum++;
                var iSameGoodsTotalPrice = item.currentprice * item.num;//相同商品总价
                fTotalPrice += iSameGoodsTotalPrice;//所有商品总价

                return `
                    <li class="list_item" data-id="${item.goodsid}" index="${item.id}">
                        <div class="goods_quanxuan_box fl">
                            <input type="checkbox" class="check_btn" checked>
                        </div>
                        <div class="goods_infos_box fl">
                            <div class="goods_pic fl">
                                <a href="javascript:;">
                                    <img src="../images/${item.goodspic}" alt="#">
                                </a>
                            </div>
                            <div class="goods_name fl">
                                <a href="javascript:;">${item.goodsname}</a>
                            </div>
                        </div>
                        <div class="goods_price_box fl">
                            
                            <del class="origin_price1">￥<span class="origin_price">${item.originprice}</span></del>
                            <p class="current_price1">￥<span class="current_price">${item.currentprice}</span></p>
                        </div>
                        <div class="goods_quantity_box fl">
                            <div class="quantity_form">
                                <a href="javascript:;" class="reduce_btn">-</a>
                                <input type="number" class="num" value="${item.num}">
                                <a href="javascript:;" class="add_btn">+</a>
                            </div>
                        </div>
                        <div class="goods_total_price_box fl">
                            ￥<span class="price">${iSameGoodsTotalPrice}</span>
                        </div>
                        <div class="goods_delete_box fl">
                            <a href="javascript:;" class="delete_btn">删除</a>
                        </div>
                    </li> 
                `;

            }).join("");
            _this.oGoodsList.innerHTML = sHtml;

            _this.oGoodsTotalNum.innerHTML = iTotalNum;

            _this.oGoodsTotalPrice.innerHTML = fTotalPrice;

            // 查找节点
            _this.InitNode();

            // 事件绑定
            _this.InitEvent();

        }
    }

    ajax(obj);
}

/************************查找节点***********************/
Cart.prototype.InitNode = function () {
    // 
    this.aGoodsListItem = this.oGoodsList.querySelectorAll(".list_item");
    console.log(this.aGoodsListItem);
    // 全选
    this.oSelectAllBtn1 = document.getElementById("select_all_btn1");
    this.oSelectAllBtn2 = document.getElementById("select_all_btn2");
    this.oSelectAllBtn3 = document.getElementById("select_all_btn3");
    this.aSelectBtn = this.oGoodsList.querySelectorAll('.check_btn');

    // 减少 添加 删除 输入框
    this.aReduceBtn = this.oGoodsList.querySelectorAll(".reduce_btn");//减少
    this.aAddBtn = this.oGoodsList.querySelectorAll(".add_btn");//添加
    this.aDeleteBtn = this.oGoodsList.querySelectorAll(".delete_btn");//删除
    this.aNumInput = this.oGoodsList.querySelectorAll(".num");//输入
    this.aSameGoodsTotalPrice = this.oGoodsList.querySelectorAll(".price");//总价
    this.aPrice = this.oGoodsList.querySelectorAll(".current_price");//单价
    console.log(this.aPrice);
    // 结算
    this.oSettleAccountsBtn = document.getElementById("next_submit");

}


/************************事件绑定***********************/
Cart.prototype.InitEvent = function () {
    // 跳转
    this.jumpHome();
    // 退出
    this.quitPage();
    // 全选
    this.selectAll1();
    this.selectAll2();
    this.selectAll3();
    this.selectSameGoods();
    // 减少商品
    this.reduceGoods();
    // 添加商品
    this.addGoods();
    // 删除商品
    this.deleteGoods();
    // 数量输入框
    this.setNumInput();
    // 结算
    this.getTotalPrice();
    // 立即购买
    // this.buyGoods();
    console.log(this.buyGoods());

}
Cart.prototype.jumpHome = function(){
    var _this = this;
    this.oLogoBtn.onclick = function(){
        location.href = "../index.html";
    }
}
// 退出
Cart.prototype.quitPage = function () {
    var _this = this;
    console.log(12333);
    this.oQuitBtn.onclick = function () {
        console.log("quit");
        location.href = "../index.html";
        removeCookie('username');
    }

}

// 全选1
Cart.prototype.selectAll1 = function () {
    var _this = this;

    this.oSelectAllBtn1.onclick = function () {

        // checkbox状态设置
        for (var i = 0; i < _this.aSelectBtn.length; i++) {
            _this.aSelectBtn[i].checked = this.checked;
        }
        _this.oSelectAllBtn2.checked = this.checked;

        _this.oSelectAllBtn3.checked = this.checked;

        // 价格计算
        if (this.checked) {
            var sum = 0;
            for (var i = 0; i < _this.aSameGoodsTotalPrice.length; i++) {
                sum += parseInt(_this.aSameGoodsTotalPrice[i].innerHTML);
            }
            _this.oGoodsTotalPrice.innerHTML = sum;
            _this.oGoodsTotalNum.innerHTML = _this.aSameGoodsTotalPrice.length;

        } else {
            _this.oGoodsTotalNum.innerHTML = 0;
            _this.oGoodsTotalPrice.innerHTML = 0;
        }
    }
}

// 全选2
Cart.prototype.selectAll2 = function () {
    var _this = this;

    this.oSelectAllBtn2.onclick = function () {

        // checkbox状态设置
        for (var i = 0; i < _this.aSelectBtn.length; i++) {
            _this.aSelectBtn[i].checked = this.checked;
        }
        //价格计算
        if (this.checked) {
            var sum = 0;
            for (var i = 0; i < _this.aSameGoodsTotalPrice.length; i++) {
                sum += parseInt(_this.aSameGoodsTotalPrice[i].innerHTML);

            }
            _this.oGoodsTotalPrice.innerHTML = sum;
            _this.oGoodsTotalNum.innerHTML = _this.aSameGoodsTotalPrice.length;

        } else {
            _this.oGoodsTotalNum.innerHTML = 0;
            _this.oGoodsTotalPrice.innerHTML = 0;
        }

    }
}

// 全选3
Cart.prototype.selectAll3 = function () {
    var _this = this;

    this.oSelectAllBtn3.onclick = function () {

        // checkbox状态设置
        for (var i = 0; i < _this.aSelectBtn.length; i++) {
            _this.aSelectBtn[i].checked = this.checked;
        }
        _this.oSelectAllBtn1.checked = this.checked;

        _this.oSelectAllBtn2.checked = this.checked;


        //价格计算
        if (this.checked) {
            var sum = 0;
            for (var i = 0; i < _this.aSameGoodsTotalPrice.length; i++) {
                sum += parseInt(_this.aSameGoodsTotalPrice[i].innerHTML);
                console.log(_this.aSameGoodsTotalPrice[i].innerHTML);
            }
            _this.oGoodsTotalPrice.innerHTML = sum;
            _this.oGoodsTotalNum.innerHTML = _this.aSameGoodsTotalPrice.length;


        } else {
            _this.oGoodsTotalNum.innerHTML = 0;
            _this.oGoodsTotalPrice.innerHTML = 0;
        }


    }
}

// 单选 选择同一种产品
Cart.prototype.selectSameGoods = function () {
    var _this = this;
    for (let i = 0; i < this.aSelectBtn.length; i++) {
        this.aSelectBtn[i].onclick = function () {
            if (this.checked) {
                _this.oGoodsTotalNum.innerHTML = parseInt(_this.oGoodsTotalNum.innerHTML) + 1;//商品件数

                var sum = parseInt(_this.aSameGoodsTotalPrice[i].innerHTML);

                _this.oGoodsTotalPrice.innerHTML = parseInt(_this.oGoodsTotalPrice.innerHTML) + sum;

            } else {
                _this.oGoodsTotalNum.innerHTML = parseInt(_this.oGoodsTotalNum.innerHTML) - 1;

                var sum = parseInt(_this.aSameGoodsTotalPrice[i].innerHTML);

                _this.oGoodsTotalPrice.innerHTML = parseInt(_this.oGoodsTotalPrice.innerHTML) - sum;


            }
        }
    }
}
// 减少商品
Cart.prototype.reduceGoods = function () {
    var _this = this;
    for (let i = 0; i < this.aReduceBtn.length; i++) {
        this.aReduceBtn[i].onclick = function () {
            // 改变输入框输入值
            _this.aNumInput[i].value--;//数量减少

            if (_this.aNumInput[i].value > 0) {
                _this.oGoodsTotalPrice.innerHTML = parseInt(_this.oGoodsTotalPrice.innerHTML) - parseInt(_this.aPrice[i].innerHTML);
            }
            if (_this.aNumInput[i].value < 1) {//临界判断
                _this.aNumInput[i].value = 1;
            }
            // 改变对应商品的总价 
            _this.aSameGoodsTotalPrice[i].innerHTML = parseInt(_this.aPrice[i].innerHTML) * parseInt(_this.aNumInput[i].value);

            // 修改数据库
            console.log(_this.aGoodsListItem[i].getAttribute('index'));
            var obj = {
                "type": "get",
                "data": "index=" + _this.aGoodsListItem[i].getAttribute('index') + "&num=" + _this.aNumInput[i].value,
                "url": "../api/cart_modify.php",
                "success": function (str) {
                    console.log(str);
                }
            }
            ajax(obj);

        }
    }

}

// 添加商品
Cart.prototype.addGoods = function () {
    var _this = this;
    for (let i = 0; i < this.aAddBtn.length; i++) {
        this.aAddBtn[i].onclick = function () {
            // 改变输入框输入值
            _this.aNumInput[i].value++;//数量增加
            var iGoodsStockNum = parseInt(_this.aGoodsInfos[i].stocknum);//商品库存量
            if (_this.aNumInput[i].value >= iGoodsStockNum) {//临界判断
                _this.aNumInput[i].value = iGoodsStockNum - 1;
            }
            // 对应商品总价
            _this.aSameGoodsTotalPrice[i].innerHTML = parseInt(_this.aPrice[i].innerHTML) * parseInt(_this.aNumInput[i].value);
            _this.oGoodsTotalPrice.innerHTML = parseInt(_this.oGoodsTotalPrice.innerHTML) + parseInt(_this.aPrice[i].innerHTML);


            // 修改数据库
            var obj = {
                "type": "get",
                "data": "index=" + _this.aGoodsListItem[i].getAttribute('index') + "&num=" + _this.aNumInput[i].value,
                "url": "../api/cart_modify.php",
                "success": function (str) {
                    console.log(str);
                }
            }
            ajax(obj);


        }
    }

}

// 删除商品
Cart.prototype.deleteGoods = function () {
    var _this = this;
    for (let i = 0; i < this.aDeleteBtn.length; i++) {
        this.aDeleteBtn[i].onclick = function () {
            // 删除数据库数据
            var obj = {
                "type":"get",
                "data":"index="+_this.aGoodsListItem[i].getAttribute('index'),
                "url":"../api/cart_delete.php",
                "success":function(str){
                    console.log(str + "delete");
                }
            }
            ajax(obj);

            // 修改总价
            if(_this.aSelectBtn[i].checked){
                // 数量
                _this.oGoodsTotalNum.innerHTML = parseInt(_this.oGoodsTotalNum.innerHTML) - 1;
                // 总价
                var sum = parseInt(_this.aSameGoodsTotalPrice[i].innerHTML);

                _this.oGoodsTotalPrice.innerHTML = parseInt(_this.oGoodsTotalPrice.innerHTML) - sum;
                
            }

            // 删除节点
            _this.aGoodsListItem[i].remove();

        }
    }

}

// 设置数量输入框
Cart.prototype.setNumInput = function () {
    var _this = this;
    for (let i = 0; i < this.aNumInput.length; i++) {
        this.aNumInput[i].onkeyup = function () {

            // 获取输入框输入值
            var sValue = this.value;

            // 非空判断
            if (trim(sValue)) {
                this.value = 1;
                return;
            }

            // 是否为小数
            sValue = parseInt(sValue);

            // 大小判断
            var iGoodsStockNum = parseInt(_this.aGoodsInfos[i].stocknum);//商品库存量
            if (sValue > iGoodsStockNum) {//输入值大于商品库存量
                sValue.length = sValue.length - 1;
            }
            this.value = sValue;

        }
    }
}

Cart.prototype.getTotalPrice = function () {
    var _this = this;
    this.oSettleAccountsBtn.onclick = function(){
        alert("计算总价");
    }

}

Cart.prototype.buyGoods = function () {

    this.oToBuyBtn.onclick = function () {
        removeCookie('username');
        location.href = "../index.html";
    }
}