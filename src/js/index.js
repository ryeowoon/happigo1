function index() {
    var index = new Index();
    index.Init();
}
// 构造函数
function Index() {
    //吸顶菜单
    this.oMenuBox = null;

    //吸低广告
    this.oCloseBtn = null;
    this.oTopMenu = null;
}
// init
Index.prototype.Init = function () {
    this.InitHtml();//数据渲染
    this.InitNode();//查找节点
    this.InitEvent();//事件绑定
}

// 数据渲染
Index.prototype.InitHtml = function () {

}

//查找节点
Index.prototype.InitNode = function () {
    this.oMenuBox = document.getElementById("menu_box");
    this.oCloseBtn = document.getElementById("close_btn");
    this.oTopMenu = document.getElementById("top_menu");
}

//事件绑定
Index.prototype.InitEvent = function () {
     // 关闭菜单
     this.closeMenu();
     // 吸顶菜单
     this.showMenu()
}

Index.prototype.closeMenu = function () {
    var _this = this;
    this.oCloseBtn.onclick = function () {
        _this.oMenuBox.style.display = "none";
    }
}

Index.prototype.showMenu = function () {
    var _this = this;
    window.onscroll = function () {
        var scroolTop = window.scrollY;
        if (scroolTop >= 200) {
            // menu.className = 'fix';
            _this.oTopMenu.style.display = "block";

            
        } else {
            // menu.className = '';
            _this.oTopMenu.style.display = "none";
        }
    }
}
