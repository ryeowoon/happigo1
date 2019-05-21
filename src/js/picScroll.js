function getPicScroll(id) {
    var picScroll = new PicScroll();
    picScroll.Init(id);
}

/*************************构造函数*****************************/
function PicScroll() {
    //轮播图盒子 ul
    this.oPicScroll = null;

    //图片按钮
    this.oPicBtnBox = null;
    this.aPicBtns = null;

    //图片
    this.aPicLis = null;

    //轮播图相关变量
    this.oPicInfos = {
        "iCurrent": 0,
        "iPicNum": 0,
        "iPicScrollWidth": 0
    }

    //其他变量
    var timer = null;

}

/*************************初始化方法*****************************/
PicScroll.prototype.Init = function (id) {

    this.oPicScroll = document.getElementById(id);//查找节点

    this.createHtml();//数据渲染
    this.findNode();//查找节点
    this.initSet();//初始化设置
    this.bindEvent();//事件绑定

}

/********************************数据渲染*****************************************/
PicScroll.prototype.createHtml = function () {

    //数据
    var aPic = ['images/06105538873492260.jpg', 'images/06107385495562880.jpg', 'images/06106538942350606.jpg', 'images/06106540184167022.jpg', 'images/06106540747726985.jpg', 'images/06107287001570072.jpg'];

    //数据渲染 图片
    var sHtml1 = aPic.map(function (item) {
        return `
        <li>
            <img src="${item}" alt="">
        </li>
        `;
    }).join("");

    //数据渲染 图片按钮
    var sHtml2 = '<div class="pic_btn">';
    for (var i = 0; i < aPic.length; i++) {
        sHtml2 += '<a href="javascript:;"></a>';
    }
    sHtml2 += '</div>';

    //
    this.oPicScroll.innerHTML = sHtml1 + sHtml2;

}

/********************************查找节点*****************************************/
PicScroll.prototype.findNode = function () {

    //图片li
    this.aPicLis = this.oPicScroll.getElementsByTagName('li');
    this.oPicInfos.iPicNum = this.aPicLis.length;

    //图片按钮
    this.oPicBtnBox = this.oPicScroll.querySelector('.pic_btn');
    this.aPicBtns = this.oPicBtnBox.children;

    //轮播图盒子宽度
    this.oPicInfos.iPicScrollWidth = this.oPicScroll.offsetWidth;

}


/********************************初始化*****************************************/
PicScroll.prototype.initSet = function () {

    //样式
    initStyle(this.aPicLis, this.oPicInfos, this.oPicBtnBox)

    //自动播放
    var _this = this;
    timer = setInterval(function () {
        getNext(_this.aPicLis, _this.oPicInfos);
        setPageBtnStyle(_this.aPicBtns, _this.oPicInfos);
    }, 6000);

}


/********************************事件绑定*****************************************/
PicScroll.prototype.bindEvent = function () {
    var _this = this;

    //鼠标移入
    this.oPicScroll.onmouseover = function () {
        clearInterval(timer);
    }

    //鼠标移出
    this.oPicScroll.onmouseout = function () {

        timer = setInterval(function () {
            getNext(_this.aPicLis, _this.oPicInfos);
            setPageBtnStyle(_this.aPicBtns, _this.oPicInfos);
        }, 6000);

    }

    //鼠标点击
    this.oPicBtnBox.onclick = function (ev) {
        if (ev.target.tagName.toLowerCase() == "a") {
            //获取当前点击btn的索引
            var iNow;
            for (var i = 0; i < _this.aPicBtns.length; i++) {
                
                if (ev.target == _this.aPicBtns[i]) {
                    iNow = i;
                    break;
                }

            }

            //判断大小
            if (iNow < _this.oPicInfos.iCurrent) {

                startMove(_this.aPicLis[_this.oPicInfos.iCurrent], { "left": _this.oPicInfos.iPicScrollWidth });// 当前图片向右移动

                _this.oPicInfos.iCurrent = iNow;

                _this.aPicLis[_this.oPicInfos.iCurrent].style.left = -_this.oPicInfos.iPicScrollWidth + 'px';//准备下一张图片

                startMove(_this.aPicLis[_this.oPicInfos.iCurrent], { "left": 0 });//播放下一张图片

            } else {

                startMove(_this.aPicLis[_this.oPicInfos.iCurrent], { "left": -_this.oPicInfos.iPicScrollWidth });// 当前图片向左移动

                _this.oPicInfos.iCurrent = iNow;

                _this.aPicLis[_this.oPicInfos.iCurrent].style.left = _this.oPicInfos.iPicScrollWidth + 'px';//准备下一张图片

                startMove(_this.aPicLis[_this.oPicInfos.iCurrent], { "left": 0 });//播放下一张图片

            }

            setPageBtnStyle(_this.aPicBtns, _this.oPicInfos);
        }
    }


}


/********************************功能方法*****************************************/
function initStyle(aPicLis, oPicInfos, oPicBtnBox) {

    //轮播图初始位置
    for (var i = 0; i < aPicLis.length; i++) {
        if (i == 0) {
            aPicLis[i].style.left = 0;
        } else {
            aPicLis[i].style.left = oPicInfos.iPicScrollWidth + 'px';
        }
    }

    //按钮初始设置
    oPicBtnBox.style.left = (oPicInfos.iPicScrollWidth - oPicBtnBox.offsetWidth) / 2 + 'px';//图片按钮设置

}


//获取下一张图片
function getNext(aPicLis, oPicInfos) {

    startMove(aPicLis[oPicInfos.iCurrent], { "left": -oPicInfos.iPicScrollWidth });// 当前图片向左移动

    oPicInfos.iCurrent++;//自增

    if (oPicInfos.iCurrent >= oPicInfos.iPicNum) {//临界判断
        oPicInfos.iCurrent = 0;
    }

    aPicLis[oPicInfos.iCurrent].style.left = oPicInfos.iPicScrollWidth + 'px';//准备下一张图片

    startMove(aPicLis[oPicInfos.iCurrent], { "left": 0 });//播放下一张图片

}




//按钮设置
function setPageBtnStyle(aPicBtns, oPicInfos) {

    for (var i = 0; i < aPicBtns.length; i++) {//排他
        aPicBtns[i].style.background = "#000";
        aPicBtns[i].style.opacity = 0.5;
    }

    aPicBtns[oPicInfos.iCurrent].style.background = "#fff";//当前按钮样式设置
    aPicBtns[oPicInfos.iCurrent].style.opacity = 1;

}