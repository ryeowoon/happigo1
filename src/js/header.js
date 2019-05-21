function head(url) {
    var head = new Head();
    head.Init(url);
}

/*************************************构造函数*************************************/
function Head() {
    // this.oHead = null;
    this.oHeadBottomInner = null;
    this.oFenleiList = null;
    this.oFenleiBox = null;
    this.aFenleiItems = null;

    //登录注册
    this.oHuanYing = null;
    this.oLoginBtn = null;//登录
    this.oRegisterBtn = null;//注册
    this.oQuitBtn = null;

    //logo 新人专享
    this.oLogoBtn = null;
    this.oNewComerBtn = null;

    //搜索
    this.oSearchBtn = null;//搜索
    this.oSearchInput = null;

    //搜索列表
    this.oGoodsKeyBox = null;
    this.aGoodsKeyList = null;

    //加入购物车
    this.oAddCartBtn = null;//加入购物车

    //所有分类 首页 美专控
    this.oHeadNav = null;
    this.aHeadNavLis = null;
    this.oCategoriesBox = null;
    this.oCategoriesBtn = null;//所有分类
    this.oHomeBtn = null;//首页
    this.oTvBtn = null;//tv直播
    this.oMeiZhuangKongBtn = null;//美妆控
    this.oChaoDaFanBtn = null;//潮搭范
    this.oMeiShiJiaBtn = null;//美食家 
    this.oXiaChuFangBtn = null;//下厨房
    // 路径
    this.sUrl = null;


}

/***************************************Init**************************************/
Head.prototype.Init = function (url) {

    this.sUrl = url;
    this.oFenleiBox = document.getElementById('fenlei');
    this.oFenleiList = document.getElementById("fenlei_list1");
    this.oHeadBottomInner = document.getElementById('head_bottom_inner');

    //数据渲染
    this.InitHtml();
    
    //查找节点
    this.InitNode();

    //事件绑定
    this.InitEvent();
}

/*************************************数据渲染*************************************/
Head.prototype.InitHtml = function () {

    //数据
    var aData = [
        {
            "title1": "服装配饰",
            "content": [
                {
                    "title2": "服装配饰1",
                    "content2": ["服装配饰11", "服装配饰12", "服装配饰13", "服装配饰14"]
                },
                {
                    "title2": "服装配饰2",
                    "content2": ["服装配饰21", "服装配饰22", "服装配饰23", "服装配饰24"]
                },
                {
                    "title2": "服装配饰3",
                    "content2": ["服装配饰31", "服装配饰32", "服装配饰33", "服装配饰34"]
                },
                {
                    "title2": "服装配饰4",
                    "content2": ["服装配饰41", "服装配饰42", "服装配饰43", "服装配饰44"]
                }
            ]

        },

        {
            "title1": "餐厨日用",
            "content": [
                {
                    "title2": "餐厨日用1",
                    "content2": ["餐厨日用11", "餐厨日用12", "餐厨日用13", "餐厨日用14"]
                },
                {
                    "title2": "餐厨日用2",
                    "content2": ["餐厨日用21", "餐厨日用22", "餐厨日用23", "餐厨日用24"]
                },
                {
                    "title2": "餐厨日用3",
                    "content2": ["餐厨日用31", "餐厨日用32", "餐厨日用33", "餐厨日用34"]
                },
                {
                    "title2": "餐厨日用4",
                    "content2": ["餐厨日用41", "餐厨日用42", "餐厨日用43", "餐厨日用44"]
                }
            ]

        },

        {
            "title1": "品牌馆",
            "content": [
                {
                    "title2": "品牌馆1",
                    "content2": ["品牌馆11", "品牌馆12", "品牌馆13", "品牌馆14"]
                },
                {
                    "title2": "品牌馆2",
                    "content2": ["品牌馆21", "品牌馆22", "品牌馆23", "品牌馆24"]
                },
                {
                    "title2": "品牌馆3",
                    "content2": ["品牌馆31", "品牌馆32", "品牌馆33", "品牌馆34"]
                },
                {
                    "title2": "品牌馆4",
                    "content2": ["品牌馆41", "品牌馆2", "品牌馆43", "品牌馆44"]
                }
            ]

        },

        {
            "title1": "个护美妆",
            "content": [
                {
                    "title2": "个护美妆1",
                    "content2": ["个护美妆11", "个护美妆12", "个护美妆13", "个护美妆14"]
                },
                {
                    "title2": "个护美妆2",
                    "content2": ["个护美妆21", "个护美妆22", "个护美妆23", "个护美妆24"]
                },
                {
                    "title2": "个护美妆3",
                    "content2": ["个护美妆31", "个护美妆32", "个护美妆33", "个护美妆34"]
                },
                {
                    "title2": "个护美妆4",
                    "content2": ["个护美妆41", "个护美妆2", "个护美妆43", "个护美妆44"]
                }
            ]

        },

        {
            "title1": "食品健康",
            "content": [
                {
                    "title2": "食品健康1",
                    "content2": ["食品健康11", "食品健康12", "食品健康13", "食品健康14"]
                },
                {
                    "title2": "食品健康2",
                    "content2": ["食品健康21", "食品健康22", "食品健康23", "食品健康24"]
                },
                {
                    "title2": "食品健康3",
                    "content2": ["食品健康31", "食品健康32", "食品健康33", "食品健康34"]
                },
                {
                    "title2": "食品健康4",
                    "content2": ["食品健康41", "食品健康42", "食品健康43", "食品健康44"]
                }
            ]

        },

        {
            "title1": "布艺家纺",
            "content": [
                {
                    "title2": "布艺家纺1",
                    "content2": ["布艺家纺11", "布艺家纺12", "布艺家纺13", "布艺家纺14"]
                },
                {
                    "title2": "布艺家纺2",
                    "content2": ["布艺家纺21", "布艺家纺22", "布艺家纺23", "布艺家纺24"]
                },
                {
                    "title2": "布艺家纺3",
                    "content2": ["布艺家纺31", "布艺家纺32", "布艺家纺33", "布艺家纺34"]
                },
                {
                    "title2": "布艺家纺4",
                    "content2": ["布艺家纺41", "布艺家纺42", "布艺家纺43", "布艺家纺44"]
                }
            ]

        },

        {
            "title1": "家电数码",
            "content": [
                {
                    "title2": "家电数码1",
                    "content2": ["家电数码11", "家电数码12", "家电数码13", "家电数码14"]
                },
                {
                    "title2": "家电数码2",
                    "content2": ["家电数码21", "家电数码22", "家电数码23", "家电数码24"]
                },
                {
                    "title2": "家电数码3",
                    "content2": ["家电数码31", "家电数码32", "家电数码33", "家电数码34"]
                },
                {
                    "title2": "家电数码4",
                    "content2": ["家电数码41", "家电数码42", "家电数码43", "家电数码44"]
                }
            ]

        },

    ];
    //数据渲染
    var sHtml1 = aData.map(function (item1) {

        var sHtml2 = item1.content.map(function (item2) {

            var sHtml3 = item2.content2.map(function (item3) {
                return `
                <a href="javascript:;" class="item">${item3}</a>
                `;
            }).join("");

            return `
            <li class="list_item2">
                <a href="javascript:;" class="item_title2">${item2.title2}</a>
                <div class="item_content2">${sHtml3}</div>
            </li>
            
            `;

        }).join("");

        return `
        <li class="list_item1">
            <a href="javascript:;" class="item_title1">${item1.title1}</a>
            <div class="item_content1">
                <ul class="fenlei_list2">${sHtml2}</ul>
            </div>
        </li>
        `;

    }).join("");


    this.oFenleiList.innerHTML = sHtml1;


}

/*************************************查找节点*************************************/
Head.prototype.InitNode = function () {
    //登录注册退出
    this.oHuanYing = document.getElementById('huanying');
    this.oLoginBtn = document.getElementById('login_btn');//登录
    this.oRegisterBtn = document.getElementById('register_btn');//注册
    this.oQuitBtn = document.getElementById('quit_btn');//退出

    //logo新人专享
    this.oLogoBtn = document.getElementById('logo_btn');//logo
    this.oNewComerBtn = document.getElementById('newcomer_btn');//新人专享

    //搜索
    this.oSearchInput = document.getElementById('search_input');//搜索输入框
    this.oSearchBtn = document.getElementById('search_btn');

    //关键字搜索
    this.oGoodsKeyBox = document.getElementById('key_box');//商品关键字ul
    this.aGoodsKeyList = this.oGoodsKeyBox.getElementsByTagName('a');//商品关键字a

    //加入购物车
    this.oAddCartBtn = document.getElementById('add_cart_btn');

    //头部导航
    this.oHeadNavBox = document.getElementById('head_nav');
    this.aHeadNavLis = this.oHeadNavBox.getElementsByTagName('a');
    this.oCategoriesBtn = document.getElementById('categories_btn');//所有分类
    this.oCategoriesBox = document.getElementById('categories_box');
    this.oHomeBtn = document.getElementById('home_btn');//首页
    this.oTvBtn = document.getElementById('tv_btn');//tv直播
    this.oMeiZhuangKongBtn = document.getElementById('meizhuangkong_btn');//美妆控
    this.oChaoDaFanBtn = document.getElementById('chaodafan_btn');//潮搭范
    this.oMeiShiJiaBtn = document.getElementById('meishijia_btn');//美食家
    this.oXiaChuFangBtn = document.getElementById('xiachufang_btn');//下厨房

    //其他
    this.aFenleiItems = this.oFenleiList.querySelectorAll('.item');

}

/*************************************事件绑定*************************************/
Head.prototype.InitEvent = function () {
    this.setUser();

    //登录 注册 退出
    this.login();//登录
    this.register();//注册
    this.quit();//退出

    //logo
    this.jumpHome();//跳转到首页
    this.jumpNewcomer();//跳转到新人专享

    //搜索
    this.setSearchInput();//设置搜索输入框
    this.searchGoods();//搜索商品

    //搜索商品关键字
    this.searchGoodsKey();//首页分类 搜索框下面的商品列表

    //加入购物车
    this.addCart();

    this.jumpPage();
}

//查询cookie设置欢迎
Head.prototype.setUser = function () {
    var _this = this;
    var sUserName = getCookie('username');

    if (sUserName) {
        this.oHuanYing.innerHTML = sUserName + ",欢迎您来到快乐购！";
        this.oRegisterBtn.style.display = "none";
        this.oLoginBtn.style.display = "none";
        this.oQuitBtn.style.display = "inline-block";
    } else {
        this.oHuanYing.innerHTML = "欢迎来到快乐购！";
        this.oRegisterBtn.style.display = "inline-block";
        this.oLoginBtn.style.display = "inline-block";
        this.oQuitBtn.style.display = "none";
    }

}

//登录
Head.prototype.login = function () {
    var _this = this;
    this.oLoginBtn.onclick = function () {
        location.href = _this.sUrl + "login.html";
    }

}

//注册
Head.prototype.register = function () {
    var _this = this;
    this.oRegisterBtn.onclick = function () {
        location.href = _this.sUrl + "register.html";
    }

}

//退出
Head.prototype.quit = function () {
    var _this = this;
    this.oQuitBtn.onclick = function () {
        removeCookie('username');
        _this.oHuanYing.innerHTML = "欢迎您来到快乐购！";
        _this.oRegisterBtn.style.display = "inline-block";
        _this.oLoginBtn.style.display = "inline-block";
        _this.oQuitBtn.style.display = "none";
    }

}

//跳转到首页
Head.prototype.jumpHome = function () {
    var _this = this;
    this.oLogoBtn.onclick = function () {
        if (_this.sUrl == "html") {
            location.href = "index.html";
        } else {
            location.href = "../index.html";
        }

    }

}

//跳转到新人专享
Head.prototype.jumpNewcomer = function () {
    var _this = this;
    this.oNewComerBtn.onclick = function () {
        // location.href = _this.sUrl + "newcomer.html";
    }
}

//设置搜索输入框
Head.prototype.setSearchInput = function () {
    var _this = this;

    //输入焦点
    this.oSearchInput.onblur = function () {
        //获取输入值
        var sValue = _this.oSearchInput.value;
        if (trim(sValue)) {
            _this.oSearchInput.value = _this.oSearchInput.getAttribute('placeholder');
            return;
        }
    }

    //获取焦点
    this.oSearchInput.onfocus = function () {
        //获取输入值
        var sValue = _this.oSearchInput.value;

        // //输入有输入不为空
        // if (!trim(sValue)) {
        //     var sValue1 = _this.oSearchInput.getAttribute('placeholder');
        //     if (sValue = sValue) {
        //         _this.oSearchInput.value = "";
        //         return;
        //     }
        // }

    }
}

//搜索
Head.prototype.searchGoods = function () {
    var _this = this;
    this.oSearchBtn.onclick = function () {

        var sSearchKey = _this.oSearchInput.value;//获取输入框输入值

        if (trim(sSearchKey)) {//如果为空
            _this.oSearchInput.value = _this.oSearchInput.getAttribute('placeholder');//获取placeholder属性值
            sSearchKey = _this.oSearchInput.getAttribute('placeholder');
        }
        location.href = _this.sUrl + "list.html?act=search&op=index&keyword=" + sSearchKey;
    }
}

//搜索商品关键字
Head.prototype.searchGoodsKey = function () {
    var _this = this;
    //搜索框下的商品列表
    for (let i = 0; i < this.aGoodsKeyList.length; i++) {
        this.aGoodsKeyList[i].onclick = function () {
            var sKeyword = this.innerHTML;
            location.href = _this.sUrl + 'list.html?act=search&op=index&keyword=' + sKeyword;
        }
    }

    for (let i = 0; i < this.aFenleiItems.length; i++) {
        this.aFenleiItems[i].onclick = function () {
            var title1 = this.parentNode.parentNode.parentNode.parentNode.previousElementSibling.innerHTML;
            var title2 = this.parentNode.previousElementSibling.innerHTML;

            console.log(title1 + "aaaa");
            console.log(title2 + "bbbb");
            var sKeyword = this.innerHTML;

            // location.href = "html/list.html?act=search&op=index&title1="+"&keyword=" + sKeyword;
            location.href = _this.sUrl + 'list.html?keyword=' + sKeyword;
        }
    }
}

//加入购物车
Head.prototype.addCart = function () {
    var _this = this;

    this.oAddCartBtn.onclick = function () {

        var sUserName = getCookie('username');

        if (sUserName) {//用户存在 跳转到购物车页
            location.href = _this.sUrl + "cart.html";
        } else {//用户不存在，跳转到购物车页
            location.href = _this.sUrl + "login.html";
        }

    }
}

//页面跳转 首页 TV直播 美妆控 潮搭范 美食家 下厨房 所有分类
Head.prototype.jumpPage = function () {

    this.setCategories();//所有分类
    this.setHome();//首页
    this.setTV();//TV直播
    this.setMeiZhuangKong();//美妆控
    this.setChaoDaFan();//潮搭范
    this.setMeiShiJia();//美食家
    this.setXiaChuFang();//下厨房

}
//所有分类
Head.prototype.setCategories = function () {
    //鼠标移入
    var _this = this;
    this.oCategoriesBox.onmouseover = this.oFenleiBox.onmouseover = function () {
        _this.oFenleiBox.style.display = "block";

    }

    //鼠标移出
    this.oCategoriesBox.onmouseout = this.oFenleiBox.onmouseout = function () {
        _this.oFenleiBox.style.display = "none";
    }
    
}

//首页
Head.prototype.setHome = function () {
    var _this = this;
    this.oHomeBtn.onclick = function () {
        if (_this.sUrl == "html") {
            location.href = "index.html";
        } else {
            location.href = "./" + _this.url + "index.html";
            // console.log("./" + _this.url + "index1.html");

        }
        // setStyle(_this.aHeadNavLis, _this.oHomeBtn);
    }
}
//TV直播
Head.prototype.setTV = function () {
    var _this = this;
    this.oTvBtn.onclick = function () {
        location.href = _this.sUrl + "tvplay.html";
        // setStyle(_this.aHeadNavLis, _this.oTvBtn);
    }
}
//美妆控
Head.prototype.setMeiZhuangKong = function () {
    var _this = this;
    this.oMeiZhuangKongBtn.onclick = function () {
        location.href = _this.sUrl + "meizhuangkong.html";
        // setStyle(_this.aHeadNavLis, _this.oMeiZhuangKongBtn);
    }
}
//潮搭范
Head.prototype.setChaoDaFan = function () {
    var _this = this;
    this.oChaoDaFanBtn.onclick = function () {
        location.href = _this.sUrl + "chaodafan.html";
        // setStyle(_this.aHeadNavLis, _this.oChaoDaFanBtn);
    }
}
//美食家
Head.prototype.setMeiShiJia = function () {
    var _this = this;
    this.oMeiShiJiaBtn.onclick = function () {
        location.href = _this.sUrl + "meishijia.html";
        
    }
}
//下厨房
Head.prototype.setXiaChuFang = function () {
    var _this = this;
    this.oXiaChuFangBtn.onclick = function () {
        location.href = _this.sUrl + "xiachufang.html";
        setStyle(_this.aHeadNavLis, _this.oXiaChuFangBtn);
    }
}

/**********************************功能方法********************************/
//排他
// function setStyle(arr, oBtn) {
//     for (var i = 1; i < arr.length; i++) {
//         arr[i].style.color = "#000";
//         arr[i].style.fontWeight = 500;
//     }
//     oBtn.style.color = "red";
//     oBtn.style.fontWeight = 600;
// }



