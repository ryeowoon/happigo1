function login(obj) {
    var login = new Login();
    login.Init(obj);
}

/******************************构造函数***************************/
function Login() {
    //注册
    this.oRegisterBtn = null;
    //登录方式
    this.oLoginMethod1 = null;
    this.oLoginMethod2 = null;
    this.oLoginBox1 = null;
    this.oLoginBox2 = null;

    //方式一
    this.oPhone = null;
    this.oPhoneErrMsg = null;
    this.oSmsVerify = null;
    this.oGetSmsVerifyBtn = null;
    this.oSmsVerifyErrMsg = null;
    this.oLoginBtn = null;

    //方式二
    this.oPhone2 = null;
    this.oPhoneErrMsg2 = null;
    this.oPsw = null;
    this.oPswErrMsg = null;
    this.oVerifyInput = null;
    this.oVerifyImg = null;
    this.oVerifyErrMsg = null;
    this.oAgree = null;
    this.oLoginBtn2 = null;

    this.oSmsCode = {
        "phone": "",
        "smsCode": ""
    };

    this.isok = {
        "click": true
    };

}

/******************************Init***************************/
Login.prototype.Init = function (obj) {
    this.oVerifyImg = obj;
    this.InitHtml();//数据渲染
    this.InitNode();//查找节点
    this.InitEvent();//事件绑定
}

Login.prototype.InitHtml = function () {

}

Login.prototype.InitNode = function () {
    //注册
    this.oRegisterBtn = document.getElementById('register_btn');
    this.oLoginMethod1 = document.getElementById("login1");
    this.oLoginMethod2 = document.getElementById("login2");

    this.oLoginBox1 = document.getElementById('loginbox1');
    this.oLoginBox2 = document.getElementById('loginbox2');

    //方式一
    this.oPhone = document.getElementById('phone');
    this.oPhoneErrMsg = document.getElementById('phone_err_msg');

    this.oSmsVerify = document.getElementById('sms_verify');
    this.oGetSmsVerifyBtn = document.getElementById('get_sms_verify_btn');
    this.oSmsVerifyErrMsg = document.getElementById('sms_verify_err_msg');
    this.oLoginBtn = document.getElementById('login_btn');

    //方式2
    this.oPhone2 = document.getElementById('phone2');
    this.oPhoneErrMsg2 = document.getElementById('phone_err_msg2');
    this.oPsw = document.getElementById('psw');
    this.oPswErrMsg = document.getElementById('psw_err_msg');
    this.oVerifyInput = document.getElementById('code_input');
    // this.oVerifyImg = document.getElementById('v_container');
    this.oVerifyErrMsg = document.getElementById('verify_err_msg');
    this.oAgree = document.getElementById('agree');
    this.oLoginBtn2 = document.getElementById('login_btn2');

}

Login.prototype.InitEvent = function () {
    //跳转到注册页
    this.jumpPage();
    //登录方式选择
    this.chooseLogin();
    //方式一：
    this.checkPhone();//手机号验证
    this.checkSms();//短信验证码验证
    this.getSmsVerificode();//获取短信验证码 
    this.login();
    //方式二：
    this.checkPhone2();//检查手机号
    this.checkPsw();//验证密码
    this.checkVerifiCode();//检查验证码
    this.login2();//登录

}

//跳转到注册页
Login.prototype.jumpPage = function () {
    this.oRegisterBtn.onclick = function () {
        location.href = "register.html";
    }
}
//登录方式选择
Login.prototype.chooseLogin = function () {

    var _this = this;

    this.oLoginMethod1.onclick = function () {
        _this.oLoginBox1.style.display = "block";
        _this.oLoginBox2.style.display = "none";
    }

    this.oLoginMethod2.onclick = function () {
        _this.oLoginBox1.style.display = "none";
        _this.oLoginBox2.style.display = "block";
    }
}

/******************方式1*********************/
//手机号
Login.prototype.checkPhone = function () {
    var _this = this;

    //获取焦点
    this.oPhone.onfocus = function () {
        _this.oPhoneErrMsg.style.display = "block";
        _this.oPhoneErrMsg.innerHTML = "请输入手机号码";
        _this.oPhoneErrMsg.style.color = "#757577";
    }

    //失去焦点
    this.oPhone.onblur = function () {
        _this.oPhoneErrMsg.style.display = "none";

    }

    //释放键盘按键 判断输入长度
    this.oPhone.onkeyup = function () {

        var sValue = this.value;//获取输入值

        if (sValue.length > 11) {//输入长度判断 如果大于11，则截取前面11位
            var sValue = sValue.substring(0, 11);
            this.value = sValue;
        }
    }

}

//短信验证码
Login.prototype.checkSms = function () {
    var _this = this;

    //获取焦点
    this.oSmsVerify.onfocus = function () {
        _this.oSmsVerifyErrMsg.style.display = "block";
        _this.oSmsVerifyErrMsg.innerHTML = "请输入您的短信验证码";
        _this.oSmsVerifyErrMsg.style.color = "#757577";
    }

    //失去焦点
    this.oSmsVerify.onblur = function () {
        _this.oSmsVerifyErrMsg.style.display = "none";
    }

    //键盘按键释放 判断长度
    this.oSmsVerify.onkeyup = function () {
        var sValue = this.value;//获取输入值

        if (sValue.length > 6) {
            var sValue = sValue.substring(0, 6);
            this.value = sValue;
        }
    }

}

//点击按钮 获取短信验证码
Login.prototype.getSmsVerificode = function () {

    var _this = this;

    this.oGetSmsVerifyBtn.onclick = function () {

        if (_this.isok.click) {
            console.log(123);

            var sPhone = _this.oPhone.value;//获取手机号

            //非空判断
            if (trim(sPhone)) {
                _this.oPhoneErrMsg.innerHTML = "您输入手机号有误";
                _this.oPhoneErrMsg.style.display = "block";
                _this.oPhoneErrMsg.style.color = "red";
                return;
            }


            ajax({
                "type": "post",
                "url": "../api/register_duanxin.php",
                "data": 'userphone=' + sPhone,
                "success": function (str) {
                    //获取短信验证码
                    var arr = JSON.parse(str);
                    var sCode = arr.phonecode;
                    _this.oSmsCode.phone = sPhone;
                    _this.oSmsCode.smsCode = sCode;
                    console.log(_this.oSmsCode);

                    //倒计时
                    _this.isok.click = false;
                    var s = 45;
                    var timer = setInterval(function () {
                        _this.oGetSmsVerifyBtn.value = s + "秒后再次获取";

                        s--;
                        if (s == 0) {
                            _this.isok.click = true;
                            _this.oGetSmsVerifyBtn.value = "获取短信验证码";
                            clearInterval(timer);
                        }
                    }, 1000);


                }
            });

        }

    }
}

//登录1
Login.prototype.login = function () {

    var _this = this;

    this.oLoginBtn.onclick = function () {

        //获取输入值
        var sPhone = _this.oPhone.value;//手机号
        var sSms = _this.oSmsVerify.value;//短信验证码


        //非空判断
        if (trim(sPhone)) {//手机号非空判断
            _this.oPhoneErrMsg.innerHTML = "您输入手机号码有误";
            _this.oPhoneErrMsg.style.display = "block";
            _this.oPhoneErrMsg.style.color = "red";
            return;
        }

        if (trim(sSms)) {//短信验证码非空判断
            _this.oSmsVerifyErrMsg.innerHTML = "您输入的短信验证码格式有误";
            _this.oSmsVerifyErrMsg.style.display = "block";
            _this.oSmsVerifyErrMsg.style.color = "red";
            return;
        }

        //手机长度判断
        if (sPhone.length < 11) {
            _this.oPhoneErrMsg.innerHTML = "您输入手机号码有误";
            _this.oPhoneErrMsg.style.display = "block";
            _this.oPhoneErrMsg.style.color = "red";
            return;
        }

        //输入验证码是否正确
        var sSmsCode = _this.oSmsCode.smsCode;//获取短信验证码
        var sSmsPhone = _this.oSmsCode.phone;//获取手机号

        if (sSmsCode == "") {//还没有获取验证码
            _this.oSmsVerifyErrMsg.style.display = "block";
            _this.oSmsVerifyErrMsg.innerHTML = "请输入正确的短信验证码";
            _this.oSmsVerifyErrMsg.style.color = "red";
            return;
        }

        if (sSms != sSmsCode) {//已经给手机发送验证码，但是输入有误
            _this.oSmsVerifyErrMsg.style.display = "block";
            _this.oSmsVerifyErrMsg.innerHTML = "请输入正确的短信验证码";
            _this.oSmsVerifyErrMsg.style.color = "red";
            return;
        }

        if (sSmsPhone != _this.oPhone.value) {
            _this.oSmsVerifyErrMsg.style.display = "block";
            _this.oSmsVerifyErrMsg.innerHTML = "请输入正确的短信验证码";
            _this.oSmsVerifyErrMsg.style.color = "red";
            return;
        }

        //查询用户是否存在
        var obj1 = {
            "type": "post",
            "url": "../api/register_checkuser.php",
            "data": "phone=" + sPhone,
            "success": function (str) {
                var arr = JSON.parse(str);
                if (arr.length < 1) {
                    _this.oPhoneErrMsg.innerHTML = "用户不存在";
                    _this.oPhoneErrMsg.style.display = "block";
                    _this.oPhoneErrMsg.style.color = "red";
                    return;
                }
               
               var sUserName = arr[0].username;
               setCookie('username',sUserName,1);
               location.href = "../index.html";
               
            }
        }

        ajax(obj1);

    }
}


/*******************方式2*****************/
//手机号
Login.prototype.checkPhone2 = function () {
    var _this = this;
    //获取焦点
    this.oPhone2.onfocus = function () {
        _this.oPhoneErrMsg2.style.display = "block";
        _this.oPhoneErrMsg2.innerHTML = "登录名可能是您的手机、邮箱或用户名";
        _this.oPhoneErrMsg2.style.color = "#757577";
    }

    //失去焦点
    this.oPhone2.onblur = function () {
        _this.oPhoneErrMsg2.style.display = "none";

    }
}

//密码
Login.prototype.checkPsw = function () {
    var _this = this;
    //获取焦点
    this.oPsw.onfocus = function () {
        _this.oPswErrMsg.style.display = "block";
        _this.oPswErrMsg.innerHTML = "您的密码可能为字母、数字或符号组合";
        _this.oPswErrMsg.style.color = "#757577";
    }
    //失去焦点
    this.oPsw.onblur = function () {
        _this.oPswErrMsg.style.display = "none";
    }

}

//验证码
Login.prototype.checkVerifiCode = function () {
    var _this = this;
    //获取焦点
    this.oVerifyInput.onfocus = function () {

        _this.oVerifyErrMsg.style.display = "block";
        _this.oVerifyErrMsg.innerHTML = "请输入右侧验证码，不区分大小写";
        _this.oVerifyErrMsg.style.color = "#757577";
    }
    //失去焦点
    this.oVerifyInput.onblur = function () {
        _this.oVerifyErrMsg.style.display = "none";
    }

    //键盘按键释放 判断长度
    this.oVerifyInput.onkeyup = function () {
        var sValue = this.value;//获取输入值
        if (sValue.length > 4) {
            var sValue = sValue.substring(0, 4);
            this.value = sValue;
        }
    }

}

//登录2
Login.prototype.login2 = function () {

    var _this = this;

    this.oLoginBtn2.onclick = function () {

        //获取输入值
        var sPhone = _this.oPhone2.value;
        var sPsw = _this.oPsw.value;
        var sVerifiCode = _this.oVerificodeInput;

        //非空判断
        if (trim(sPhone)) {//手机号非空判断
            _this.oPhoneErrMsg2.innerHTML = "手机号不能为空"
            _this.oPhoneErrMsg2.style.display = "block";
            _this.oPhoneErrMsg2.style.color = "red";
            return;
        }

        if (trim(sPsw)) {//密码非空判断
            _this.oPswErrMsg.style.display = "block";
            _this.oPswErrMsg.innerHTML = "密码不能为空"
            _this.oPswErrMsg.style.color = "red";
            return;
        }

        //判断验证码是否正确
        var sVerifiCode = _this.oVerifyInput.value;
        var bResult = _this.oVerifyImg.validate(sVerifiCode);
        if (!bResult) {
            _this.oVerifyErrMsg.innerHTML = "验证码错误";
            _this.oVerifyErrMsg.style.display = "block";
            _this.oVerifyErrMsg.style.color = "red";
            return;
        }

        
        var obj1 = {
            "type": "post",
            "url": "../api/register_checkuser.php",
            "data": "&phone=" + sPhone,
            "success": function (str) {
                //判断用户名是否存在
                var arr = JSON.parse(str);
                console.log(arr);
                if (arr.length < 1) {
                    _this.oPhoneErrMsg2.innerHTML = "用户不存在";
                    _this.oPhoneErrMsg2.style.display = "block";
                    _this.oPhoneErrMsg2.style.color = "red";
                    return;
                }
                //密码是否匹配
                var sUserPsw = arr[0].psw;
                if(sUserPsw != sPsw){
                    _this.oPswErrMsg.innerHTML = "密码出错";
                    _this.oPswErrMsg.style.display = "block";
                    _this.oPswErrMsg.style.color = "red";
                    return;
                }
               var sUserName = arr[0].username;
               
               setCookie('username',sUserName,1);
               location.href = "../index.html";

            }
        }

        ajax(obj1);

    }

}


