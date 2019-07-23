<template>

<div>
    <h1> hello world</h1>

	<img src="\\www.baidu.com/img/bd_logo1.png?qua=high" style="width:100%" />
</div>

</template>
<script>
import '@/assets/css/public.less'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import { Flexbox, FlexboxItem, Divider, XButton } from 'vux'
export default {
  components: {
	Flexbox,
    FlexboxItem,
    Divider,
    XButton
  },
  data() {
    return {
	    has_data:true,
        nick_name:'',
	    subscribe:'',
	    shop_name:'',
	    //long_share_url: config.baseUrl + "lucky?user_id=" + win_user.user_id + "&merchant_id=" + win_user.merchant_id + "&appid=" + Lockr.get('appid'),
	    };
    },
    created() {
    	
    },
    mounted(){
     let params = {
      };
        _g.apiPost(
            "group/generate_poster",
            params,
            data => {
            }
        );

        _g.jssdk(['onMenuShareAppMessage','onMenuShareTimeline']);
        this.onCopy();
    },
    methods: {
    	getActivityData(){
    	},
	    checkPartakeNumber(){
	   },

	   //获取中奖名单
	    getWinningPrizeUser(){
	   },
	   //点击转盘时候
	    rotate_handle() {

	    },
	    //抽奖接口
	    addTurntableRecord() {
	    },
	    //寻找抽中的奖品
	    getPrize(relation_id){
	    },
	    //转盘转动
	    rotating(index) {
	    },
	    game_over() {
	    	this.btnDisabled=true;
		    this.toast_control = true;
		    this.hasPrize = this.prize_list[this.i].isPrize;
		    },
	    //关闭弹窗
	    close_toast() {
	    	this.click_flag = true;
	      	this.btnDisabled=true;
		    this.toast_control = false;
	    },
	    shareFriend(){
	    	this.isShowShare=true;
	    	this.onCopy();
	    },
	    //分享好友
	    onCopy() {
	    	wx.ready(() => {
	    		var imgUrl =config.baseUrl + "src/assets/images/lucky/choujiang.png"; // 分享图标
	    		var merchant_name=win_user.merchant_name;
	    		var nick_name=this.nick_name;
	    		var shop_name=this.shop_name;
	    		let _this=this;
	    			//分享给好友
					wx.onMenuShareAppMessage({
						title: this.activity_turntable_data.name,
						desc: '我正在参加'+shop_name+'的抽奖活动，你也一起来参加吧【'+nick_name+'】',
						link: this.long_share_url,
						imgUrl:imgUrl,
						success: function () {
					       // 用户确认分享后执行的回调函数
							_g.apiPost('share_record/addsharerecord', {
								merchant_id: win_user.merchant_id,
								type: 1,
								from_table:'activity_turntable',
								from_id:_this.activity_turntable_data.activity_turntable_id,
								user_id:win_user.user_id,
								to_type:'微信好友！ '
							}, (data) => {
								_g.toastMsg('分享成功', 'success', 1500, () => {
									router.go(0);
								});
							})
					    },
					    cancel: function() {
						// 用户取消分享后执行的回调函数
						}
					});
					//分享到朋友圈
					wx.onMenuShareTimeline({
						title: this.activity_turntable_data.name, // 分享标题
						link: this.long_share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: imgUrl, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
							_g.apiPost('share_record/addsharerecord', {
								merchant_id: win_user.merchant_id,
								type: 1,
								from_table:'activity_turntable',
								from_id:_this.activity_turntable_data.activity_turntable_id,
								user_id:win_user.user_id,
								to_type:'朋友圈 '
							}, (data) => {
								_g.toastMsg('分享成功！', 'success', 1500, () => {
									router.go(0);
								});
							})
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
				})


	    	this.toast_control = false;

	    },
	    onError(e) {},
	    //用户领奖
	    userGetPrize() {
	    },
	    //我的奖品
	    goMyPrize() {
	    },
	    //中奖名单(轮播效果)
	    showRollbox() {
	    	let old_scrollHeight=this.scrollHeight;
		      let speed=30;
		      let Rollbox=document.getElementById("Rollbox");
		      let Rollbox_list=document.getElementById("Rollbox_list");
		      let Rollbox1_list=document.getElementById("Rollbox1_list");
		      Rollbox1_list.innerHTML=Rollbox_list.innerHTML
		      Rollbox.scrollTop=Rollbox.scrollHeight
		      function Marquee(){
			      if(Rollbox_list.offsetTop-Rollbox.scrollTop>=0)
			      	Rollbox.scrollTop+=Rollbox1_list.offsetHeight
			      else{
			      	Rollbox.scrollTop--
			      }
		      }
		      setInterval(Marquee,speed)
		},
	}
};
</script>
<style lang="less">
.container_box {
  width: 100%;
  .lucky-wheel {
    width: 100%;
    height: 100%;
    background: #f5685a center bottom;
    background-size: 100%;
    height: 510px;
  }
  }
</style>
