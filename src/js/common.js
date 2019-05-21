//ajax
function ajax(obj) {
    //参数配置
    var defaultObj = {
        "data": "",
        "async": true
    }
    extend(defaultObj, obj);

    //创建对象
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }


    //发送请求
    if (defaultObj.type.toLowerCase() == "get") {
        xhr.open("get", defaultObj.url + "?" + defaultObj.data, defaultObj.async);
        xhr.send(null);
    } else if (defaultObj.type.toLowerCase() == "post") {
        xhr.open("post", defaultObj.url, defaultObj.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defaultObj.data);
    }

    //检测状态 接收数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var str = xhr.responseText;
                defaultObj.success(str);
            } else {
                alert('出错啦,http码是：' + xhr.status);
            }
        }
    }
}

//拷贝
function extend(obj1, obj2) {
    for (var key in obj2) {
        obj1[key] = obj2[key];
    }
}

//非空判断 空返回true 非空返回false
function trim(str) {
    if (str.replace(/\s+/g, "") == "") {
        return true;
    } else {
        return false;
    }
}


/*************************正则表达式****************************/
//用户名
function checkUserName(str) {
    var reg = /^[a-zA-Z][a-zA-Z0-9]{6,10}$/;//字母开头 字母或者数字结尾 6到8位
    return reg.test(str);
}

//邮箱
function checkEmail(str) {
    var reg = /^[a-zA-Z0-9](\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(str);
}

//正则 密码
function checkPassword(sPassword) {
    /*
    1.6-20位
    2.可以包含的字符：数字 字母 下划线 @
    */
    var reg = /^([a-zA-Z0-9\@\_]){6,20}$/;
    return reg.test(sPassword);

}


/******************************运动***********************************/

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = getstyle(obj, key) * 100; //透明度
            } else {
                cur = parseInt(getstyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) {
                fnend(); //调用函数
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}

//获取样式  
function getstyle(ele, cls) {
    //ele 节点   cls：属性名
    if (getComputedStyle(ele, false)) {
        //在高级浏览器下面
        return getComputedStyle(ele, false)[cls];
    } else {
        //在低版本浏览器 IE8-
        return ele.currentStyle[cls];
    }
}


function strToObj(str) {

    var obj = {};
    var arr = str.split('&');
    arr.forEach(function (item) {
        var newarr = item.split('=');
        obj[newarr[0]] = newarr[1];

    });
    return obj;
}

// 正则验证
var checkReg = {
   
    tel: function (str) { //号码
        var reg = /^1[3-9]\d{9}$/
        return reg.test(str);
    },
    email: function (str) { //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
        var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
        return reg.test(str);
    },
    idcard: function (str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    psweasy: function (str) { //6-18位首字母开头
        var reg = /^[a-zA-Z]\w{5,17}$/;
        return reg.test(str);
    },
    pwwagain: function (str1, str2) { //确认密码
        return str1 === str2; //全等 恒等
    },
    urladr: function (str) { //路径：网址规则
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    name: function (str) { //账号字母开头,6-20位
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    chinese: function (str) { //中文
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday: function (str) { //生日
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }
}

// cookie
function setCookie(key, value, iDay) {
	//key:键名   value：键值    iDay：失效时间
	//document.cookie = 'name=malin;expires=20190527;path=/';
	var now = new Date();
	now.setDate(now.getDate() + iDay); //iDay:5天后失效， -1：立即失效
	document.cookie = key + '=' + value + ';expires=' + now + ';path=/';
}

function getCookie(key) {
	//获取cookie值
	var str = document.cookie;//name=malin; psw=123456
	var arr = str.split('; '); //[name=malin,psw=123456]
	for(var ele of arr) {
		var arr2 = ele.split('='); //[name,malin]
		if(key == arr2[0]) {
			return arr2[1];
		}
	}
}

function removeCookie(key) {
	//删除cookie。把这个值变成失效
	setCookie(key, '', -1); //设置成过去的时间
}