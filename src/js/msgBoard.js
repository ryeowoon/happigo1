function msgboard(id) {
    var msgboard = new Msgboard();
    msgboard.Init(id);
}
/*******************构造函数*******************/
function Msgboard() {
    // 留言列表
    this.oMsgList = null;
    this.aMsgListItem = null;

}

/*******************init*******************/
Msgboard.prototype.Init = function (id) {
    // 查找元素节点
    this.oMsgList = document.getElementById(id);
    // 数据渲染
    this.InitHtml();
}

/*******************数据渲染*******************/
Msgboard.prototype.InitHtml = function () {
    var _this = this;

    var obj = {
        "type": "get",
        "url": "../api/detail_msgboard.php",
        "data": "",
        "success": function (str) {
            // 数据渲染
            var arr = JSON.parse(str);

            var sHtml = arr.map(function (item) {
                // console.log(item.level);

                var sHtml1 = "";
                for (var i = 0; i < item.level; i++) {
                    sHtml1 += '<i class="icon"></i>';
                }

                return `
                <li class="liuyanban_item clearfix">
                    <div class="content_box fl">
                        <p class="liuyan">${item.msg}</p>
                        <span class="time">${item.time}</span>
                    </div>
                    <div class=" level_box fl">
                        <div class="level clearfix">${sHtml1}</div>
                    </div>
                    <div class="user_infos_box fl">
                        <div class="user_pic"></div>
                        <p class="user_name">${item.name}</p>
                    </div>
                </li>
                
                `;
            }).join("");

            _this.oMsgList.innerHTML = sHtml;

            //查找节点
            _this.InitNode();

            //事件绑定
            _this.InitEvent();


        }
    }
    ajax(obj);
}

/*******************查找节点*******************/
Msgboard.prototype.InitNode = function () {

}

/*******************事件绑定*******************/
Msgboard.prototype.InitEvent = function () {

}