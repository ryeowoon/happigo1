function register(obj) {
    var register = new Register();
    register.Init(obj);
}

/************************构造函数***********************/
function Register() {

    //登录页面快捷跳转
    this.oLoginPageBtn = null;

    //手机号
    this.oPhoneInput = null;//手机号
    this.oPhoneErrMsg = null;//手机号输入提示信息

    //短信验证码
    this.oSmsVerificodeInput = null;//短信验证码
    this.oGetSmsVerificodeBtn = null;//获取短信验证码btn
    this.oSmsVerificodeErrMsg = null;//短信验证码提示消息
    this.oSmsCode = {
        "smsCode": ""
    };

    //密码
    this.oPswInput = null;//密码
    this.oPswErrMsg = null;//密码提示

    //再次输入密码
    this.oPswInput2 = null;//密码
    this.oPswErrMsg2 = null;//密码提示

    // this.verifyCode = new GVerify("v_container");

    //验证码
    this.oVerifyCode = null;
    this.oVerificodeInput = null;//验证码
    this.oVerificodeErrMsg = null;//验证码输入提示

    //立即注册
    this.oRegisterBtn = null;
    this.oAgreecheckbox = null;

    //其他
    this.isok = {
        "click": true
    };

}


/************************init***********************/
Register.prototype.Init = function (obj) {
    this.oVerifyCode = obj;
    this.InitNode();//查找节点
    this.InitHtml();//数据渲染
    this.InitEvent();//事件绑定
}

/************************查找节点***********************/
Register.prototype.InitNode = function () {
    //登录页面快捷跳转
    this.oLoginPageBtn = document.getElementById("login_page_btn");

    //手机号
    this.oPhoneInput = document.getElementById('phone');//手机号
    this.oPhoneErrMsg = document.getElementById('phone_err_msg');//手机号输入提示信息

    //短信验证码
    this.oSmsVerificodeInput = document.getElementById("sms_verificode_input");
    this.oGetSmsVerificodeBtn = document.getElementById("get_sms_verificode");//获取短信验证码btn
    this.oSmsVerificodeErrMsg = document.getElementById("sms_err_msg");//短信验证码提示消息


    //密码
    this.oPswInput = document.getElementById("psw");//密码
    this.oPswErrMsg = document.getElementById("psw_err_msg");//密码提示

    //再次输入密码
    this.oPswInput2 = document.getElementById("psw2");//密码
    this.oPswErrMsg2 = document.getElementById("psw_err_msg2");//密码提示

    //验证码
    this.oVerificodeInput = document.getElementById("code_input");//验证码
    // this.oVerificodeImg = document.getElementById("v_container");//验证码图片
    // this.oVerificodeChangeBtn = document.getElementById("change_btn");//换一张
    this.oVerificodeErrMsg = document.getElementById("verifi_err_msg");//验证码输入提示

    //立即注册
    this.oRegisterBtn = document.getElementById("register_btn");
    this.oAgreecheckbox = document.getElementById("agree");

}

/************************数据渲染***********************/
Register.prototype.InitHtml = function () {

}

/************************事件***********************/
Register.prototype.InitEvent = function () {
    this.JumpLoginPage();//立即登录
    this.checkPhone();//手机号验证
    this.checkSms();//短信验证码验证
    this.getSmsVerificode();//点击按钮，获取短信验证码
    this.checkPsw();//密码验证
    this.checkPsw2();//密码二次验证
    this.checkVerifiCode();//验证码验证
    this.registerNewUser();//立即注册

}

//立即登录
Register.prototype.JumpLoginPage = function () {
    this.oLoginPageBtn.onclick = function () {
        location.href = "login.html";
    }
}

//手机号
Register.prototype.checkPhone = function () {
    var _this = this;

    //获取焦点
    this.oPhoneInput.onfocus = function () {
        _this.oPhoneErrMsg.style.display = "block";
        _this.oPhoneErrMsg.innerHTML = "请输入11位手机号";
        _this.oPhoneErrMsg.style.color = "#757577";
    }

    //失去焦点
    this.oPhoneInput.onblur = function () {
        _this.oPhoneErrMsg.style.display = "none";

    }

    //释放键盘按键 判断输入长度
    this.oPhoneInput.onkeyup = function () {

        var sValue = this.value;//获取输入值

        if (sValue.length > 11) {//输入长度判断 如果大于11，则截取前面11位
            var sValue = sValue.substring(0, 11);
            this.value = sValue;
        }
    }

}

//短信验证码
Register.prototype.checkSms = function () {
    var _this = this;

    //获取焦点
    this.oSmsVerificodeInput.onfocus = function () {
        _this.oSmsVerificodeErrMsg.style.display = "block";
        _this.oSmsVerificodeErrMsg.innerHTML = "请输入发送给您手机上的验证码";
        _this.oSmsVerificodeErrMsg.style.color = "#757577";
    }

    //失去焦点
    this.oSmsVerificodeInput.onblur = function () {
        _this.oSmsVerificodeErrMsg.style.display = "none";
    }

    //键盘按键释放 判断长度
    this.oSmsVerificodeInput.onkeyup = function () {
        var sValue = this.value;//获取输入值

        if (sValue.length > 6) {
            var sValue = sValue.substring(0, 6);
            this.value = sValue;
        }
    }

}

//点击按钮 获取短信验证码
Register.prototype.getSmsVerificode = function () {

    var _this = this;

    this.oGetSmsVerificodeBtn.onclick = function () {

        if (_this.isok.click) {

            //获取手机号
            var sPhone = _this.oPhoneInput.value;

            //手机号非空判断
            if (trim(sPhone)) {
                _this.oPhoneErrMsg.style.display = "block";
                _this.oPhoneErrMsg.style.color = "red";
                return;
            }

            //手机号正则验证
            if (!checkReg.tel(sPhone)) {
                _this.oPhoneErrMsg.style.display = "block";
                _this.oPhoneErrMsg.style.color = "red";
                return;
            }

            //查询数据库判断手机号是否已经被注册
            var obj = {
                "type": "post",
                "url": "../api/register_checkuser.php",
                "data": "phone=" + sPhone,
                "success": function (str) {

                    var arr = JSON.parse(str);
                    if (arr.length > 0) {
                        _this.oPhoneErrMsg.innerHTML = "手机号码已存在";
                        _this.oPhoneErrMsg.style.display = "block";
                        _this.oPhoneErrMsg.style.color = "red";
                        return;
                    }

                    ajax({
                        "type": "post",
                        "url": "../api/register_duanxin.php",
                        "data": 'userphone=' + sPhone,
                        "success": function (str) {

                            //获取手机验证码
                            var arr = JSON.parse(str);
                            var sCode = arr.phonecode;
                            _this.oSmsCode.smsCode = sCode;
                            console.log(_this.oSmsCode);

                            _this.isok.click = false;

                            //倒计时
                            var s = 120;

                            var timer = setInterval(function () {
                                _this.oGetSmsVerificodeBtn.value = s + "秒后再次获取";

                                s--;
                                if (s == 0) {
                                    _this.isok.click = true;
                                    _this.oGetSmsVerificodeBtn.value = "获取短信验证码";
                                    clearInterval(timer);
                                }
                            }, 1000);

                        }
                    });
                }
            }

            ajax(obj);

        }



    }
}

//密码
Register.prototype.checkPsw = function () {
    var _this = this;
    //获取焦点
    this.oPswInput.onfocus = function () {
        _this.oPswErrMsg.style.display = "block";
        _this.oPswErrMsg.innerHTML = "请输入您的密码,您的密码可能为字母、数字或符号组合";
        _this.oPswErrMsg.style.color = "#757577";
    }
    //失去焦点
    this.oPswInput.onblur = function () {
        _this.oPswErrMsg.style.display = "none";
    }

    //键盘按键释放 判断长度
    this.oPswInput.onkeyup = function () {
        var sValue = this.value;//获取输入值

        if (sValue.length > 20) {
            var sValue = sValue.substring(0, 20);
            this.value = sValue;
        }
    }

}

//二次密码
Register.prototype.checkPsw2 = function () {
    var _this = this;

    //获取焦点
    this.oPswInput2.onfocus = function () {
        _this.oPswErrMsg2.style.display = "block";
        _this.oPswErrMsg2.innerHTML = "请输入您的密码,您的密码可能为字母、数字或符号组合";
        _this.oPswErrMsg2.style.color = "#757577";
    }

    //失去焦点
    this.oPswInput2.onblur = function () {
        _this.oPswErrMsg2.style.display = "none";
    }

    //键盘按键释放 判断长度
    this.oPswInput2.onkeyup = function () {
        var sValue = this.value;//获取输入值

        if (sValue.length > 20) {
            var sValue = sValue.substring(0, 20);
            this.value = sValue;
        }
    }

}

//验证码
Register.prototype.checkVerifiCode = function () {
    var _this = this;
    //获取焦点
    this.oVerificodeInput.onfocus = function () {
        _this.oVerificodeErrMsg.style.display = "block";
        _this.oVerificodeErrMsg.innerHTML = "请输入右侧验证码";
        _this.oVerificodeErrMsg.style.color = "#757577";
    }
    //失去焦点
    this.oVerificodeInput.onblur = function () {
        _this.oVerificodeErrMsg.style.display = "none";
    }

    //键盘按键释放 判断长度
    this.oVerificodeInput.onkeyup = function () {
        var sValue = this.value;//获取输入值

        if (sValue.length > 4) {
            var sValue = sValue.substring(0, 4);
            this.value = sValue;
        }
    }

}

//立即注册
Register.prototype.registerNewUser = function () {
    var _this = this;

    this.oRegisterBtn.onclick = function () {

        //获取输入值
        var sPhone = _this.oPhoneInput.value;//手机号
        var sSms = _this.oSmsVerificodeInput.value;//短信验证码
        var sPsw = _this.oPswInput.value;//密码
        var sPsw2 = _this.oPswInput2.value;//二次密码
        var sVerifiCode = _this.oVerificodeInput.value;//验证码

        //非空判断
        if (trim(sPhone)) {//手机号非空判断
            _this.oPhoneErrMsg.style.display = "block";
            _this.oPhoneErrMsg.style.color = "red";
            return;
        }

        if (trim(sSms)) {//短信验证码非空判断
            _this.oSmsVerificodeErrMsg.style.display = "block";
            _this.oSmsVerificodeErrMsg.innerHTML = "您的短信验证码有误";
            _this.oSmsVerificodeErrMsg.style.color = "red";
            return;
        }

        if (trim(sPsw)) {//密码非空判断
            _this.oPswErrMsg.style.display = "block";
            _this.oPswErrMsg.innerHTML = "密码不能为空"
            _this.oPswErrMsg.style.color = "red";
            return;
        }

        if (trim(sPsw2)) {//二次密码非空判断
            _this.oPswErrMsg2.style.display = "block";
            _this.oPswErrMsg2.style.innerHTML = "密码不能为空";
            _this.oPswErrMsg2.style.color = "red";
            return;
        }

        //判断两次密码是否相同
        if (sPsw != sPsw2) {
            _this.oPswErrMsg2.style.display = "block";
            _this.oPswErrMsg2.innerHTML = "密码与确认密码不相同";
            _this.oPswErrMsg2.style.color = "red";
            return;
        }
        //密码长度判断
        if (sPsw2.length < 6) {
            _this.oPswErrMsg2.style.display = "block";
            _this.oPswErrMsg2.innerHTML = "密码长度不正确，请输入6至20位的密码";
            _this.oPswErrMsg2.style.color = "red";
            return;
        }

        //判断验证码是否正确
        var sVerifiCode = _this.oVerificodeInput.value;
        var bResult = _this.oVerifyCode.validate(sVerifiCode);
        if (!bResult) {
            _this.oVerificodeErrMsg.style.display = "block";
            _this.oVerificodeErrMsg.innerHTML = "验证码出错";
            _this.oVerificodeErrMsg.style.color = "red";
            return;
        }

        //手机号格式判断
        if (!checkReg.tel(sPhone)) {
            _this.oPhoneErrMsg.style.display = "block";
            _this.oPhoneErrMsg.innerHTML = "手机格式错误";
            _this.oPhoneErrMsg.style.color = "red";
            return;
        }

        //验证码判断


        var sSmsCode = _this.oSmsCode.smsCode;//获取短信验证码

        if (sSmsCode == "") {//还没有获取验证码
            _this.oSmsVerificodeErrMsg.style.display = "block";
            _this.oSmsVerificodeErrMsg.innerHTML = "手机验证码错误！";
            _this.oSmsVerificodeErrMsg.style.color = "red";
            return;
        }

        if (sSms != sSmsCode) {//已经给手机发送验证码，但是输入有误
            _this.oSmsVerificodeErrMsg.style.display = "block";
            _this.oSmsVerificodeErrMsg.innerHTML = "手机验证码错误！";
            _this.oSmsVerificodeErrMsg.style.color = "red";
            return;
        }

        //将用户信息填入数据库
        var sUserName = "happigo" + sPhone;

        var oData = {
            "type": "post",
            "url": "../api/register_user.php",
            "data": "username=" + sUserName + "&phone=" + sPhone + "&psw=" + sPsw,
            "success": function (str) {
                if (str) {
                    alert("注册成功！");
                    location.href = "login.html";
                } else {
                    alert("注册失败！");
                }

            }
        }

        ajax(oData);

    }
}