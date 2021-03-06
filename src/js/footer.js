function getFooter(id) {
    var footer = new Footer();
    footer.Init(id);
}
//构造函数
function Footer() {
    this.oFooter = null;
}

//初始化方法
Footer.prototype.Init = function (id) {
    this.oFooter = document.getElementById(id);
    this.InitHtml();
    // this.InitNode();
    // this.InitEvent();
}
Footer.prototype.InitHtml = function () {

    var sHtml = `
        <div class="footer_top">
            <div class="footer_top_inner">
                <ul class="t_box">
                    <li>
                        <i class="icon"></i>
                        <p class="p1">成功上市</p>
                        <p class="p2">股票代码300413</p>
                    </li>
                    <li>
                        <i class="icon"></i>
                        <p class="p1">成功上市</p>
                        <p class="p2">股票代码300413</p>
                    </li>
                    <li>
                        <i class="icon"></i>
                        <p class="p1">成功上市</p>
                        <p class="p2">股票代码300413</p>
                    </li>
                    <li>
                        <i class="icon"></i>
                        <p class="p1">成功上市</p>
                        <p class="p2">股票代码300413</p>
                    </li>
                    <li>
                        <i class="icon"></i>
                        <p class="p1">成功上市</p>
                        <p class="p2">股票代码300413</p>
                    </li>
                    <li>
                        <i class="icon"></i>
                        <p class="p1">成功上市</p>
                        <p class="p2">股票代码300413</p>
                    </li>
                </ul>
                <div class="b_box">
                    <div class="left fl">
                        <dl>
                            <dt>使用帮助</dt>
                            <dd>税费收取规则</dd>
                            <dd>新手指南</dd>
                            <dd>用户协议</dd>
                            <dd>常见问题</dd>
                        </dl>
                        <dl>
                            <dt>会员服务</dt>
                            <dd>快乐币政策</dd>
                            <dd>会员等级</dd>
                            <dd>会员权益</dd>
                        </dl>
                        <dl>
                            <dt>支付方式</dt>
                            <dd>快乐币支付</dd>
                            <dd>在线支付</dd>
                            <dd>货到付款</dd>
                            <dd>优惠卷支付</dd>
                        </dl>
                        <dl>
                            <dt>配送方式</dt>
                            <dd>包邮政策</dd>
                            <dd>配送说明</dd>
                            <dd>费用说明</dd>
                        </dl>
                        <dl>
                            <dt>售后服务</dt>
                            <dd>电子发票</dd>
                            <dd>售后咨询</dd>
                            <dd>退货政策</dd>
                            <dd>退货办理</dd>
                        </dl>
                        <dl>
                            <dt>关于我们</dt>
                            <dd>快乐购有限责任公司介绍</dd>
                            <dd>联系我们</dd>
                        </dl>
                    </div>
                    <div class="right fr">
                        <div class="weixin1 fl">
                            <h6>手机快乐购</h6>
                            <div class="weixin_pic1">
                                <img src="../images/footer_ewm_01.png" alt="">
                            </div>
                            <p>下载移动客户端</p>
                        </div>
                        <div class="weixin2 fl">
                            <h6>快乐购微信</h6>
                            <div class="weixin_pic2">
                                <img src="../images/footer_ewm_02.png" alt="">
                            </div>
                            <p>快乐购微信</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer_bottom">
            <div class="footer_bottom_inner">
                <ul>
                    <li>
                        <a href="javascript:;">关于快乐购</a>
                        <span></span>
                    </li>
                    <li>
                        <a href="javascript:;">投资者关系</a>
                        <span></span>
                    </li>
                    <li>
                        <a href="javascript:;">自营品牌招商</a>
                        <span></span>
                    </li>
                    <li>
                        <a href="javascript:;">联系我们</a>
                        <span></span>
                    </li>
                    <li>
                        <a href="javascript:;">营业证照</a>
                    </li>
                </ul>
                <p class="copy">
                    <span>Copyright&copy; 2006-2018 happigo. All Rights Reserved</span>
                </p>
                <div class="contact">
                    <span>免费服务热线:400-705-1111</span>
                    <span class="line"></span>
                    <span>固话也可拨打:400-705-8800</span>
                    <span>E-Mail:service@happigo.com</span>
                </div>
                <div class="license_infos">
                    <a href="javascript:;">湘ICP备17009657号</a>
                    <span>信息网络传播视听节目许可证号：1810530</span>
                    <img src="../images/jh.png" alt="">
                    <a href="javascript:;">湘公网安备 43010502000556号</a>
                    <a href="javascript:;">食品经营许可证 JY14301000273760</a>
                </div>
                <p class="company_logo">
                    <a href="javascript:;">
                        <img src="../images/footer_img4.png" alt="">
                    </a>
                    <a href="javascript:;">
                        <img src="../images/footer_shuidi.png" alt="">
                    </a>
                </p>
            </div>
        </div>
    
    `;

    this.oFooter.innerHTML = sHtml;
}