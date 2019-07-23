<template>
  <div class="bargainlist_box" style="width:100%" v-wechat-title="$route.meta.title">
    <!-- 砍价商品 -->
    <div slot="default" class="vux_list">
      <!-- 顶部图片 -->
      <div :style="top_color_css">
        <img :src="pageinfo.top_image" style="width:100%;display: block;">
      </div>
      <div class="cmp-bgmusic" @click="onPlayMusic(1)">
          <div class="animate-wrapper">
            <div class="bgmusic" :class="{'stopped':stopped}">
                <div class="control">
                    <div class="control-after"></div>
                </div>
            </div>
          </div>
      </div>
    <!-- 用户参团信息 -->
    <div class="tg_user_info">
        <MARQUEE behavior="scroll" contenteditable="true" onstart="this.firstChild.innerHTML+=this.firstChild.innerHTML;" scrollamount="3" width="380">
        <SPAN unselectable="on" style="color:white;">天优课程教育集团首届福利节!精品课程大礼包!优惠前所未有!</SPAN>
        </MARQUEE>
    </div>

        <!-- 悬浮框显示 -->
        <div class="xf_share_box" @click="is_custom_show()"></div>

      <!-- 下部文字编辑内容 -->
      <div :style="top_color_css">
        <!-- <img :src="pageinfo.top_image" style="width:100%;text-align:center"> -->

        <van-row>
          <van-col span="24">
            <div
              class="content_css"
              v-html="pageinfo.bottom_content"
              style="width:100%;text-align:center"
            ></div>
          </van-col>
        </van-row>

        <!-- <div class="banner_ft" style="width:100%;text-align:center">
          <div class="vux_ft" style="width:100%;text-align:center">
            <div class="kj_time" v-html="pageinfo.bottom_content"></div>
          </div>
        </div>-->
      </div>
    </div>

    <div class="btn-group">
        <button type="button" class="btn-txt"><img :src="headimgurl" alt="">{{nick_name}}</button>
        <div class="btn-bd">
            <button type="button" class="btn-color1" @click="is_kf_show()">
                <span>活动规则</span>
            </button>
            <button type="button" class="btn-bg-no"></button>

            <button type="button" class="btn-color2" v-if="baseinfo.status == 1 && nobug == 0 " @click="isshow('2')">
                立即报名
            </button>
            <button type="button" class="btn-color2" v-if="nobug == 1 ">
                已报名
            </button>
            <button type="button" class="btn-color2" v-if="baseinfo.status == 2 && nobug == 0 ">
                未开始
            </button>
            <button type="button" class="btn-color2" v-if="baseinfo.status == 3 && nobug == 0 ">
                已结束
            </button>
        </div>
    </div>

    <van-popup v-model="show_input" position="bottom" class="buy-info-box">
      <div class="footer">
        <van-row>
          <van-col class="buy-top-tip">确认信息</van-col>
          <van-col class="buy-top-info">
          <span>{{baseinfo.group_num}}个人已参加</span>
          </van-col>
        </van-row>

        <van-cell-group>
          <van-field
            v-model="name"
            required
            placeholder="请输入真实姓名"
          />

          <van-field
            v-model="telephone"
            placeholder="请输入手机号码"
            required
          />
        </van-cell-group>
          <div class="buy-btn">
              <van-button size="large" type="warning" @click="goBuy()">确认提交</van-button>
          </div>
      </div>
    </van-popup>


      <!-- 自定义弹框 -->
      <van-popup v-model="custom_show" style="width: 80%;border-radius:8px;">
          <div class="kf_info">拨打客服电话：<span>{{baseinfo.activity_telephone}}</span><br><span>长按保存</span></div>
          <img style="width:100%" :src="poster_img">
      </van-popup>

    <div>
      <div class="audio">
        <!--隐藏audio标签-->
        <audio id="music1" controls="controls" loop="loop" :src="mp3_src"></audio>
      </div>
    </div>
  </div>

  <!-- 砍价商品   end -->
</template>
<script>
import "@/assets/css/public.less";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
// import { Marquee, MarqueeItem } from 'vux'
import { Previewer } from 'vux'
Vue.use(VueClipboard);
import {
  Flexbox,
  FlexboxItem,
  Divider,
  XButton,
  Group,
  Cell,
  Tabbar,
  TabbarItem
} from "vux";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XButton,
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Previewer,
    // Marquee,
    // MarqueeItem
  },
  data() {
    return {
      poster_img:"../../assets/images/qrcode.jpg",
      dcrc_icon:"",
      kf_show: false,
      custom_show: false, // 自定义框
      loading_show: false,
      show_input: false,
      nobug: 0,
      checked: "",
      order_id: "", //订单ID
      ref_user_id: "", //推荐人ID
      activity_id: "", //活动ID
      baseinfo: [],
      activityinfo: [],
      pageinfo: [],
      orderlist: [],
      orderInfo:[],
      top_color_css: "",
      tg_color_css: "",
      group_color_css: "",
      brokerage_color_css: "",
      group_type: "5", //1-直接购买 2-参团购买
      group_type_t: "5", //1-直接购买 2-参团购买 3-参加团
      name: "", //姓名
      telephone: "", //联系电话
      disabled: false,
      single_payname: "单人购买1299元",
      payname: "我要开团-3人成团价299元",
      dcrc_qrcode: "",
      mp3_src: "http://mp.szxiawa.com/uploads/mp3/mfcb.mp3",
      merchant_name: win_user.merchant_name,
      i: 0, //测试使用
      img: "",
      intervalNum: 100,
      is_winning: -1,
      prize_record: [],
      partake_info: [],
      lottery_share: 0,
      prize_user: [], //中奖名单
      scrollHeight: "",
      share_url: "",
      isShowShare: false,
      btnDisabled: true,
      has_data: false,
      styl: "",
      stopped: false, // 控制音乐播放器样式
      style_icon: "",
      style_img: "",
      nick_name: win_user.nickname,
      headimgurl: win_user.headimgurl,
      subscribe: "",
      shop_name: "",
      _interval: 0,
      act_last_time: [0,0,0,0],
      long_share_url:
        config.baseUrl +
        "index?id=" + route.query.id +
        "&ref_user_id=" + win_user.user_id +
        "&order_id=" + this.order_id +
        "&appid=" + Lockr.get("appid")
    };
  },
  created() {
    if (!route.query.id || !win_user.user_id) {
      _g.toastMsg("请勿异常访问！");
      this.$router.replace({
        name: "test"
      });
      return false;
    }
  },
  activated() {

      this.nick_name = win_user.nickname;
      this.headimgurl =win_user.headimgurl;
    // this.getActivityData();
  },
  destroyed () {
        clearInterval(this._interval)
    },
  mounted() {
    this.getActivityData();
    this.audio_pay();
    this.close();
    this.InitPlayMusic(); // 新增播放音乐方法
    _g.jssdk(['onMenuShareAppMessage','onMenuShareTimeline']);
  },
  computed: {

    toast_title() {
    },
    toast_pictrue() {
      //中奖顶部图标
      if (this.is_winning == 1) {
        this.styl = "top: -7.5rem;left: -1.6rem;width: 18.75rem;";
        return require("../../assets/images/lucky/congratulation.png");
      }
    }
  },
  methods: {
     // 倒计时
     countDown() {
         // 目标日期时间戳
           //const end = Date.parse(new Date(this.baseinfo.end_date))
           const end = this.baseinfo.end_time
         // 当前时间戳
         const now = Date.parse(new Date())
         // 相差的毫秒数
         const msec = end*1000 - now
         if (msec <= 0 || this.baseinfo.status == 3){
           clearInterval(this._interval)
           return
         }
           //console.log(now/1000);
           //console.log(end);// 当前时间戳
           // 计算时分秒数
         let day = parseInt(msec / 1000 / 60 / 60 / 24)
         let hr = parseInt(msec / 1000 / 60 / 60 % 24)
         let min = parseInt(msec / 1000 / 60 % 60)
         let sec = parseInt(msec / 1000 % 60)
         // 个位数前补零
         hr = hr > 9 ? hr : '0' + hr
         min = min > 9 ? min : '0' + min
         sec = sec > 9 ? sec : '0' + sec
         this.act_last_time = [day, hr, min, sec];
         // 控制台打印
         //console.log(day + "天" +hr + "小时" + min + "分钟" +sec + "秒")
         //console.log(this.act_last_time)

       },
    //播放音乐
    close() {
      var audio = document.getElementById("music1");
      audio.play(); // 播放
    },
    //切换选择
    radio_group() {},
    //显示购买窗口
    isshow(type) {
      if(type == 3)
      {
        // this.group_type=3;
        this.payname="我要加入 TA 的团 成团价"+this.activityinfo.group_amount+"元";
        // this.group_type_t=3;
      }else if(type==2){
        this.payname="我要报名! 支付"+this.activityinfo.group_amount+"元";
        }else{
          this.payname=this.single_payname;
        }
        this.group_type=type;
        this.group_type_t=type;
      console.log(type);
      this.show_input = true;
    },
    //显示客服
    is_kf_show() {
      this.kf_show = true;
    },
    //显示自定义弹框
    is_custom_show() {
      let param = {
        user_id: win_user.user_id,
        activity_id: route.query.id,
        poster_image: this.pageinfo.poster_image,
        long_share_url: this.long_share_url,
      };
      _g.showLoading("图片生成中...");
      _g.apiPost(
        "Group/makePosterImage",
        param,
        data => {
            this.poster_img=data.src;
            this.custom_show = true;
          _g.closeLoading();
        },
        () => {
          _g.getError();
        }
      );
    },
    getActivityData() {
      let params = {
        activity_id: route.query.id,
        user_id: win_user.user_id,
        order_id: route.query.order_id,
        ref_user_id: route.query.ref_user_id,
        long_share_url: this.long_share_url,
        appid: win_appid
      };
      _g.apiPost(
        "group/activity_info",
        params,
        data => {
          this.loading_show=true;
          this.baseinfo = data;
          this.$route.meta.title =  this.baseinfo.activity_content;
          console.log(this.baseinfo.end_time);
          this.pageinfo = data.page_config;
          this.orderlist = data.order_list;
          this.activityinfo=data.activity_config;
          this.orderInfo=data.order_info;
          this.order_id = data.order_info.id;
          this.long_share_url = this.long_share_url + "&order_id=" + this.order_id;
          this.single_payname= "单人购买"+this.activityinfo.old_amount+"元";
          if(data.is_join != 1)
          {
            this.payname= "我要开团-"+this.activityinfo.group_number+"人成团价"+this.activityinfo.group_amount+"元";
          }else{
            this.payname= "我要加入 TA 的团 成团价"+this.activityinfo.group_amount+"元";
          }

            this.onCopy();

          if (this.pageinfo.top_color == "") {
            this.top_color_css =
              "width:100%;text-align:center;background: " +
              this.pageinfo.top_color +
              " center bottom;width:100%";
          }
          if (this.pageinfo.tg_color == "") {
            this.tg_color_css =
              "background: " +
              this.pageinfo.tg_color +
              " center bottom;width:100%";
          }
          if (this.pageinfo.group_color == "") {
            this.group_color_css =
              "background: " +
              this.pageinfo.group_color +
              " center bottom;width:100%";
          }
          if (this.pageinfo.brokerage_color == "") {
            this.brokerage_color_css =
              "background: " +
              this.pageinfo.brokerage_color +
              " center bottom;width:100%";
          }
          if (data.activity_config.dcrc_qrcode) {
            this.dcrc_qrcode = data.activity_config.dcrc_qrcode;
          }
          if (data.page_config.dcrc_icon) {
            this.dcrc_icon = data.page_config.dcrc_icon;
          }
          if (this.pageinfo.bg_music) {
              this.mp3_src = this.pageinfo.bg_music;
          } else {
              //this.mp3_src = "http://tg.zhubaoe.cn/uploads/mp3/gohome.mp3";
              this.mp3_src = "http://mp.szxiawa.com/uploads/mp3/mfcb.mp3";
          }
          if(this.orderInfo.user_name !='')
          {
            this.name=this.orderInfo.user_name;
          }
          if(this.orderInfo.mobile !='')
          {
            this.telephone=this.orderInfo.mobile;
          }
          //已经参加,已经支付
          if(this.orderInfo.status == 2 || this.orderInfo.status == 3)
          {
            this.nobug=1;
          }

          clearInterval(this._interval)
          this._interval = setInterval(() => {
            this.countDown();
          }, 1000)
        },
        () => {
          this.show_default_all = true;
          this.show_default_nopay = true;
          this.show_default_wait = true;
          this.show_default_complate = true;
        }
      );
    },

    goBuy() {
      let order_id = route.query.order_id;
      let ref_user_id = route.query.ref_user_id;
      let activity_id = route.query.id;
      console.log('gobuy');
       _g.showLoading("申请中...");
      if (activity_id == "") {
        _g.toastMsg("请勿异常访问！");
        this.$router.replace({
          name: "test"
        });
        return false;
      }
      let group_type = this.group_type;
      let group_type_t = this.group_type_t;
      let name = this.name;
      let telephone = this.telephone;

      let params = {
        owner_order_id: this.orderInfo.id,
        order_id: order_id,
        ref_user_id: ref_user_id,
        user_id: win_user.user_id,
        activity_id: activity_id,
        isGroup: 5,
        username: name,
        phone: telephone
      };
      console.log(params);
      _g.apiPost(
        "group/readyToPay",
        params,
        data => {
          //支付成功
          if (data.code === 0) {
            this.order_id = data.order_id;
            data.activity_id=activity_id;
            console.log(data);
            this.pay(data);
          } else {
            _g.closeLoading();
            _g.toastMsg("申请失败，请刷新后重试或联系客服人员");
          }
        },
        () => {
          this.show_default_all = true;
          this.show_default_nopay = true;
          this.show_default_wait = true;
          this.show_default_complate = true;
        }
      );
    },

    async pay(data) {
      this.disabled = true;
      if (data.code !== 0) {
        _g.closeLoading();
        _g.toastMsg("申请失败，请刷新后重试或联系客服人员！");
        this.disabled = false;
        return false;
      }
      this.disabled = false;
      //0元支付
      if (data.pay_amount <= 0) {
        let zeropay = await _g.apiRequest("group/zeroPay", {
          user_id: win_user.user_id,
          activity_id: data.activity_id,
          order_id: data.order_id
        });
        if (zeropay.code !== 0) {
          _g.closeLoading();
              _g.toastMsg("申请失败，请刷新后重试！");
            this.disabled = false;
            return false;
          } else {
            _g.closeLoading();
            _g.toastMsg("申请成功！");
              // this.$router.go(0)\
              let _this = this
            setTimeout(function(){
              _this.$router.go(0)
            },500)
        }
        return false;
      }else{

        _g.showLoading("申请中...");
          let paybodytitle = _.truncate(this.baseinfo.activity_name, {
            length: 45
          });
          let pay_data = {
            openid: win_user.openid,
              appid: win_appid,
              body: paybodytitle,
              out_trade_no: this.order_id,
              total_fee: this.activityinfo.group_amount,
              notify_url: config.baseUrl + "index.php/wxpay/order_groupbuy/notify"
            };
            console.log(pay_data);
          //微信支付
           let jsapiResult = await _g.apiRequest("wx_pay/getjsapiparameters", pay_data);

          _g.closeLoading();
          if (jsapiResult.code == 0) {
            let _this = this
            let payResult = await _g.pay(jsapiResult.data);

            if (payResult === true) {
              _this.$router.go(0)
              this.$router.go(0)
              }
          } else {
            _g.floatMsg("", jsapiResult.msg);
          }
      }

              // console.log(11);
              // this.$router.go(0)
      _g.closeLoading();
      _g.toastMsg("申请超时，请刷新后重试！");
      console.log(data);
      return false;
    },

    checkPartakeNumber() {},

    //获取中奖名单
    getWinningPrizeUser() {},
    //点击转盘时候
    rotate_handle() {},
    //抽奖接口
    addTurntableRecord() {},
    //寻找抽中的奖品
    getPrize(relation_id) {},
    //转盘转动
    rotating(index) {},
    game_over() {
      this.btnDisabled = true;
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.i].isPrize;
    },
    //关闭弹窗
    close_toast() {
      this.click_flag = true;
      this.btnDisabled = true;
      this.toast_control = false;
    },
    shareFriend() {
      this.isShowShare = true;
      this.onCopy();
    },
    audio_pay() {
      var audo = document.getElementById("music1");
      audo.play();
      // audo.src=this.mp3_src;
      wx.config({
        debug: false, // 这里为false
        //appId: "wx4611582462475d7e", // 以下随意填写即可
        appId: "wxe0deba39657a483b", // 以下随意填写即可
        timestamp: new Date().getTime(),
        nonceStr: "",
        signature: "",
        jsApiList: ["checkJsApi"]
      });
      wx.ready(function() {
        audo.play();
        this.stopped = false;
      });
      wx.error(function(err) {

      });
    },
    //分享好友
    onCopy() {
      wx.ready(() => {
        // var imgUrl = config.baseUrl + "src/assets/images/lucky/choujiang.png"; // 分享图标
        var imgUrl = this.pageinfo.top_image; // 分享图标
        var merchant_name = win_user.merchant_name;
        var nick_name = win_user.nickname;
        var shop_name = this.shop_name;
        var act_content = this.baseinfo.activity_content;
        let _this = this;
        //分享给好友
        wx.onMenuShareAppMessage({
          title: "【"+nick_name+"】向你推荐"+act_content,
          desc: act_content,
          link: this.long_share_url,
          imgUrl: imgUrl,
          success: function() {
            // 用户确认分享后执行的回调函数
            _g.toastMsg("分享成功", "success", 1500, () => {
                              console.log("go");
                            });
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: "【"+nick_name+"】向你推荐"+act_content,
          link: this.long_share_url,
          imgUrl: imgUrl,
          success: function() {
            // 用户确认分享后执行的回调函数

          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });

      this.toast_control = false;
    },
    //用户开团信息
    InitTgUserInfo() {
        setTimeout(function () {
            if($("#scrolluser_old").is(":visible") == true && $("#scrolluser_old li").length > 20){
                // var total_num = $("#scrolluser_old li").length;
                // var modulus_num = total_num % 5;
                // for (var i=1; i<= modulus_num; i++) {
                //     $("#scrolluser_old li:first").remove();
                // };
                $('.tg_user_photo .marquee').vTicker({
                    showItems: 20,
                    mousePause: false
                });
            }
        }, 1000);
    },
    // 播放音乐
    InitPlayMusic(e) {
        var audio = document.getElementById("music1");
        if (audio.src) {
            audio.addEventListener("canplay", function(){//监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
                audio.play(); // 首次进来播放
                this.stopped = false;
            });
        }
    },
    // 控制播放 -- 2
    onPlayMusic(e) {
        var audio = document.getElementById("music1");
        if (audio.src && e) {
            if(audio.paused == true){
                audio.play();// 这个就是播放
                this.stopped = false;
            }else{
                audio.pause();// 这个就是暂停
                this.stopped = true;
            }
        }
    },
    // 控制播放
    onError(e) {},
    //用户领奖
    userGetPrize() {},
    //我的奖品
    goMyPrize() {},
    //中奖名单(轮播效果)
    showRollbox() {
      let old_scrollHeight = this.scrollHeight;
      let speed = 30;
      let Rollbox = document.getElementById("Rollbox");
      let Rollbox_list = document.getElementById("Rollbox_list");
      let Rollbox1_list = document.getElementById("Rollbox1_list");
      Rollbox1_list.innerHTML = Rollbox_list.innerHTML;
      Rollbox.scrollTop = Rollbox.scrollHeight;
      function Marquee() {
        if (Rollbox_list.offsetTop - Rollbox.scrollTop >= 0)
          Rollbox.scrollTop += Rollbox1_list.offsetHeight;
        else {
          Rollbox.scrollTop--;
        }
      }
      setInterval(Marquee, speed);
    },
  }
};
</script>
<style lang="less">
.container_box {
  width: 100%;
  .lucky-wheel {
    width: 100%;
    background: #f5685a center bottom;
    background-size: 100%;
    height: 510px;
  }
}
.group_list{
    width: 100%;
    display: block;
}
.btn-group {
    height: 60px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,.4);
    .btn-bd{
        padding: 10px;
        display: flex;
        button{
            height: 40px;
            border-radius: 10px;
        }
    }
    .btn-bg-no{background: none;}
    .btn-txt{
        background: none;
        color: #fff;
        width: 30%;
        font-size: 14px;
        //font-size: 12px;
        position: absolute;
        z-index: 2;
        left: 50%;
        bottom: 10px;
        margin-left: -15%;
        img{
            width: 50px;
            height: 50px;
            /*width: 36px;*/
            /*height: 36px;*/
            border-radius: 50%;
            display: block;
            //margin: -35px auto 3px;
            margin: 1px auto;
            z-index:999999;
        }
    }
}
.btn-group button {
  flex: 1;
  border: none;
}
.buy-info-box,.buy-info-box .van-cell-group,.buy-info-box .van-cell{
    background: rgb(236,37,40);
    color: #fff;
    font-size: 20px;
}
.buy-info-box .van-field__control{
    color: #fff;
}
.buy-info-box .van-cell{
    display: block;
    .van-cell__title{
        width: 90%;
        float: left;
        span{
            width: 70%;
            display: block;
        }
    }
}
.buy-info-box input,.buy-info-box input::-webkit-input-placeholder{
    color: #fadc14 !important;
    font-size: 20px;
}
.van-radio__icon--checked .van-icon{
    background: #fadc14;
    border-color: #fadc14;
}
.buy-top-tip {
  font-size: 18px;
  float: left;
    padding: 15px;
    color: #fff;
}
.buy-top-info{
    float: right;
    padding: 10px 15px;
    color: #fff;
    span{
        display: block;
        font-size: 16px;
    }
    span:last-child{
        color: rgb(250,220,20);
    }
}
.buy-btn{
    padding:10px 10px 15px;
    button{
        border: 1px rgba(255,255,255,.05) solid;
        color: rgb(250,220,20);
        background: linear-gradient(rgb(236,54,52),rgb(236,53,55));
        box-shadow: 0 3px 15px rgb(187,37,40) inset;
        border-radius: 5px;
        font-size: 18px;
    }
}
.content_css img {
  width: 100%;
}
.top_color_css {
  width: 100%;
  text-align: center;
  img {
    width: 100px;
    height: 100%;
  }
}
.audio {
  display: none;
}
.vux_list {
  padding-bottom: 60px;
}
.btn-color {
  background: #eee;
}
.btn-group button span{
    display: block;
}
.btn-group button .rmb:before{
    content: "¥";
    font-size: 10px;
    margin-right: 3px;
    vertical-align: middle;
}
.btn-color1{
    background: rgb(31,198,33);
    line-height: 16px;
    color: #fff;
}
.btn-color2{
    background: rgb(240,146,84);
    line-height: 16px;
    color: #fff;
}
.btn-color3{
    background: rgb(213,74,69);
    line-height: 16px;
    color: #fff;
}
// 以下添加于20190509
.container_body{
    /*background:-webkit-gradient(linear, 100% 0, 0 0, from(#F94E02), to(#FCBC4B));*/
    /*background:-webkit-linear-gradient(left, #F94E02, #FCBC4B);*/
    /*background:-moz-linear-gradient(left, #F94E02, #FCBC4B);*/
    /*background:-o-linear-gradient(left, #F94E02, #FCBC4B);*/
    /*background:linear-gradient(left, #F94E02, #FCBC4B);*/
    background: rgb(254,142,6);
    padding: 10px;
}
.tg-content{
    background: #fff;
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
}
.tg-content:last-child{
    margin: 0;
}
.tg_act_info{
    clear: both;
    min-height: 55px;
    padding: 10px;
    overflow: hidden;
    .price{
        width: 100%;
        clear: both;
        color:#333;
        text-align: center;
        span {
            display: inline-block;
            margin-right:1px;
            line-height: 20px;
            font-size: 14px;
            s{
                font-size: 12px;
            }
        }
    }
    .kj_time{
        font-size: 13px;
        text-align: center;
        clear: both;
        background: rgba(255,255,255,.3);
        border-radius: 5px;
        p:first-child{
            line-height: 30px;
            font-weight: bold;
        }
        p:last-child {
            line-height: 22px;
            em{
                display: inline-block;
                vertical-align: bottom;
                font-style: normal;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                background: #000;
                color: #fff;
                width: 26px;
                line-height: 26px;
                margin: 0 5px;
                border-radius: 4px;
            }
            span.second{
                background: red;
            }
        }
    }
}
/*.tg_buy_info{*/
    /*background:-webkit-gradient(linear, 100% 0, 0 0, from(#F94E02), to(#FCBC4B));*/
    /*background:-webkit-linear-gradient(left, #F94E02, #FCBC4B);*/
    /*background:-moz-linear-gradient(left, #F94E02, #FCBC4B);*/
    /*background:-o-linear-gradient(left, #F94E02, #FCBC4B);*/
    /*background:linear-gradient(left, #F94E02, #FCBC4B);*/
    /*clear: both;*/
    /*overflow: hidden;*/
    /*img {*/
        /*padding: 10px;*/
        /*width: 40px;*/
        /*height: 40px;*/
        /*border-radius: 5%;*/
    /*}*/
/*}*/
.top_images{
    clear: both;
    padding: 10px;
    .tit{
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 5px;
    }
    .bd{
        li{
            float: left;
            width: 12.28%;
            margin: 8px 1%;
            text-align: center;
            img{
                display: block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin: 0 auto;
            }
            b{
                font-weight: normal;
                font-size: 12px;
                line-height: 22px;
                height: 22px;
                text-overflow: ellipsis;
                display: block;
                overflow: hidden;
            }
        }
    }
    .list{
        .items{
            border-bottom: 1px #ccc solid;
            padding: 10px 5px;
            overflow: hidden;
            .info{
                float: left;
                margin-right: 10px;
                width: 52%;
                overflow: hidden;
                img{
                    width: 40px;
                    height: 40px;
                    display: block;
                    float: left;
                    margin-right: 10px;
                }
                span{
                    float: left;
                    font-size: 14px;
                    width: 62%;
                    line-height: 24px;
                    height: 20px;
                    display: block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .time{
                float: right;
                p:first-child{
                    color: #f60;
                    font-size: 14px;
                }
                p:last-child{
                    font-size: 12px;
                }
            }
        }
        .items:last-child{
            border: 0;
        }
    }
}
// .align-middle
// {
//   height: 532px;
//         overflow: hidden;
// }
.align-middle-li
{
  height: 532px;
        overflow: hidden;
}

.tg_user_info_index{
    position: absolute;
    z-index: 1;
    top: 0;
    right: 10px;
    .marquee{
        height: 532px !important;
        overflow: hidden;
        marquee{
            height: 100%;
            max-height: 532px;
        }
    }
    li{
        background: rgba(0,0,0,.55);
        padding: 3px 10px 3px 3px;
        border-radius: 50px;
        line-height: 30px;
        width: auto !important;
        margin-top: 40px !important;
        color: #fff;
        overflow: hidden;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: block;
            float: left;
        }
        b,span{
            margin-left: 6px;
        }
    }
}
.tg_user_info{
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    font-size: 20px;
    background: rgba(0,0,0,.6);
    li{
        background: rgba(0,0,0,.55);
        padding: 3px 10px 3px 3px;
        border-radius: 50px;
        line-height: 30px;
        width: auto !important;
        margin-top: 40px !important;
        color: #fff;
        overflow: hidden;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: block;
            float: left;
        }
        b,span{
            margin-left: 6px;
        }
    }
}
.tg_user_photo{
    background: #4F4F4F;
    padding: 15px 0;
    overflow: hidden;
    .marquee,ul{
        height: 320px !important;
        overflow: hidden;
        li {
            width: 20% !important;
            float: left;
            text-align: center;
            overflow: hidden;
            img {
                width: 50px;
                height: 50px;
                display: block;
                margin: 0 auto;
                border-radius: 50%;
            }
            b {
                line-height: 30px;
                display: block;
                color: #fff;
                height: 30px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}
.cmp-bgmusic{
    top: 30px;
    right: 20px;
    width: 40px;
    height: 40px;
    z-index: 2;
    position: fixed;
    .animate-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .bgmusic, .bgmusic .control {
        width: 100%;
        height: 100%;
    }
    .bgmusic .control {
        background:url('data:image/gif;base64,R0lGODlhUABQAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplODZjZmIzYy1kZmNkLTQ4NTUtOTg4Yi0zNmI5OTNhNzllZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDFDRjk0RDM4NzRFMTFFNEE3OTJCRDg1RUEzMENCNDkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDFDRjk0RDI4NzRFMTFFNEE3OTJCRDg1RUEzMENCNDkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjEwOThmZTMtYjNkYi00NmM5LWFhN2UtZWE0ZDVlZWRlOThjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmU4NmNmYjNjLWRmY2QtNDg1NS05ODhiLTM2Yjk5M2E3OWVlOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFj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') transparent no-repeat 50%;
        background-size:contain
    }
    .bgmusic .control .control-after {
        position: absolute;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAA3lBMVEUAAAAAAAD///////8SEhIJCQn///93d3cfHx/////m5ub///9NTU3///////////+Li4uBgYFMTEz////////////////6+vru7u729vampqb9/f28vLyoqKgvLy/7+/v39/fr6+v////Jycl/f38iIiL09PT///////////+NjY15eXnMzMzKysokJCT///8bGxv////////w8PBGRkY+Pj6rq6vz8/Pi4uLU1NT9/f26urq1tbWrq6ugoKBra2tfX1+6uroxMTEdHR3m5ubNzc2ysrL29vZtbW3///+PY+y7AAAASXRSTlOZAPvtnZdbvJa9ubCuraebmJiVeUscA/z1z53lo56V/fry7+C/lvj11NLFvampoqCgPTz2raqe9+3m49nV0cy4tKOWlu/i1c65MWHllQAAAhlJREFUOMullelW4kAQhdsOyRAIEEMIa5BdRUA2cddRZ7vv/0ITTOhKOh31HO+v7uI7nE4tt9hRUt66WjrXONfOS9W1J/2YhN0yEiq7mbBhArw5s528rucde9bkgGko4VoRaHdeWUyvnTZQrKVhQ4O205kkfReEDRmuAIUxQbnH5+g0LgCVJHwJ7hMawL1f4uxzXMbhCk6PWUINPInz8SkqBBvgghXwyQ+iOYwDXNPQYikYvZ/i1sKgFsFFFJgCxsQS1wKKIWxAG8ts7np6CzQWh3teg/EOm6BEUDas5RAY5ugh5h52caen4foF29MjUZ07uAFcRocpYba8jT2kg/IR88C7KnifuG2f/rrL4bEVmkwBh1me8t8i1MSaVTHPhtnNiQjNUGUl2CqYh/ADwTZK7AzOB/BoI0IOzpiGvApGCFt9EcpDYxz612Ad/BN42ojDnzzj4Tn+DPpAJXzFEh+oTh3jF3Sm1CmKsrC2izrBsaKs8DcZvHq6QX04oTGhcqca6d8Ge022FKJGklp0hFA0UtSi783fpkxbPIJ7Eqy34YZjtROxISL1c0nYh3kYWFGXesRS09PAkhVI8CNxZAWyydyHD54SRiaTsq/l/ea6/4eKTPaVZYwkMkbJcltZbIssV2nmJDJzeU346TXhaxgYGQvopZvohxdaQOrVNredN11/c+y5WG3fWJokbxWs4wHng2Adr+R1/B+RXVzDNR25fgAAAABJRU5ErkJggg==') transparent no-repeat 50%;
        background-size: 100% 100%;
        -webkit-animation: rotate2d 1.2s linear infinite;
        animation: rotate2d 1.2s linear infinite;
        z-index: -1;
        width:100%;
        height:100%
    }
    .bgmusic.stopped .control {
        background:none
    }
    .bgmusic.stopped .control .control-after {
        -webkit-animation:none;
        animation:none
    }
}
.cmp-poster{
    top: 50%;
    right: 20px;
    width: 40px;
    height: 40px;
    z-index: 2;
    position: fixed;
    .animate-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .bgmusic, .bgmusic .control {
        width: 100%;
        height: 100%;
    }
    .bgmusic .control {
        background:url('data:image/gif;base64,R0lGODlhUABQAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplODZjZmIzYy1kZmNkLTQ4NTUtOTg4Yi0zNmI5OTNhNzllZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDFDRjk0RDM4NzRFMTFFNEE3OTJCRDg1RUEzMENCNDkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDFDRjk0RDI4NzRFMTFFNEE3OTJCRDg1RUEzMENCNDkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjEwOThmZTMtYjNkYi00NmM5LWFhN2UtZWE0ZDVlZWRlOThjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmU4NmNmYjNjLWRmY2QtNDg1NS05ODhiLTM2Yjk5M2E3OWVlOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFj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') transparent no-repeat 50%;
        background-size:contain
    }
    .bgmusic .control .control-after {
        position: absolute;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAA3lBMVEUAAAAAAAD///////8SEhIJCQn///93d3cfHx/////m5ub///9NTU3///////////+Li4uBgYFMTEz////////////////6+vru7u729vampqb9/f28vLyoqKgvLy/7+/v39/fr6+v////Jycl/f38iIiL09PT///////////+NjY15eXnMzMzKysokJCT///8bGxv////////w8PBGRkY+Pj6rq6vz8/Pi4uLU1NT9/f26urq1tbWrq6ugoKBra2tfX1+6uroxMTEdHR3m5ubNzc2ysrL29vZtbW3///+PY+y7AAAASXRSTlOZAPvtnZdbvJa9ubCuraebmJiVeUscA/z1z53lo56V/fry7+C/lvj11NLFvampoqCgPTz2raqe9+3m49nV0cy4tKOWlu/i1c65MWHllQAAAhlJREFUOMullelW4kAQhdsOyRAIEEMIa5BdRUA2cddRZ7vv/0ITTOhKOh31HO+v7uI7nE4tt9hRUt66WjrXONfOS9W1J/2YhN0yEiq7mbBhArw5s528rucde9bkgGko4VoRaHdeWUyvnTZQrKVhQ4O205kkfReEDRmuAIUxQbnH5+g0LgCVJHwJ7hMawL1f4uxzXMbhCk6PWUINPInz8SkqBBvgghXwyQ+iOYwDXNPQYikYvZ/i1sKgFsFFFJgCxsQS1wKKIWxAG8ts7np6CzQWh3teg/EOm6BEUDas5RAY5ugh5h52caen4foF29MjUZ07uAFcRocpYba8jT2kg/IR88C7KnifuG2f/rrL4bEVmkwBh1me8t8i1MSaVTHPhtnNiQjNUGUl2CqYh/ADwTZK7AzOB/BoI0IOzpiGvApGCFt9EcpDYxz612Ad/BN42ojDnzzj4Tn+DPpAJXzFEh+oTh3jF3Sm1CmKsrC2izrBsaKs8DcZvHq6QX04oTGhcqca6d8Ge022FKJGklp0hFA0UtSi783fpkxbPIJ7Eqy34YZjtROxISL1c0nYh3kYWFGXesRS09PAkhVI8CNxZAWyydyHD54SRiaTsq/l/ea6/4eKTPaVZYwkMkbJcltZbIssV2nmJDJzeU346TXhaxgYGQvopZvohxdaQOrVNredN11/c+y5WG3fWJokbxWs4wHng2Adr+R1/B+RXVzDNR25fgAAAABJRU5ErkJggg==') transparent no-repeat 50%;
        background-size: 100% 100%;
        -webkit-animation: rotate2d 1.2s linear infinite;
        animation: rotate2d 1.2s linear infinite;
        z-index: -1;
        width:100%;
        height:100%
    }
    .bgmusic.stopped .control {
        background:none
    }
    .bgmusic.stopped .control .control-after {
        -webkit-animation:none;
        animation:none
    }
}
.kf_info{
    font-size: 12px;
    color: rgb(236,59,61);
    text-align: center;
    padding: 10px 0;
    span{
        color: rgb(78,189,92);
    }
}
.rotate2d {
    -webkit-animation-name:rotate2d;
    animation-name:rotate2d;
    -webkit-animation-timing-function:linear;
    animation-timing-function:linear
}
@-webkit-keyframes rotate2d {
    0% {
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    to {
        -webkit-transform:rotate(1turn);
        transform:rotate(1turn)
    }
}
@keyframes rotate2d {
     0% {
         -webkit-transform:rotate(0deg);
         transform:rotate(0deg)
     }
     to {
         -webkit-transform:rotate(1turn);
         transform:rotate(1turn)
     }
 }

.xf_share_box{
    position: fixed;
    z-index: 1200;
    right: 1rem;
    top: 25%;
    //background: url('/uploads/mp3/xiaolian2.jpeg');
    background: url('/uploads/mp3/xl.png');
    background-size: 2.3rem;
    border-radius: 50%;
    width: 2.3rem;
    height: 2.3rem;
    line-height: 2.5rem;
    text-align: center;
    color: #fff;
    border: .1rem #fff solid;
    overflow: hidden;
}


</style>
