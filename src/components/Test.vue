<template>
	<div>
		<!--<tab class="top" :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center">所有订单</tab-item>
        <tab-item class="vux-center">未支付订单</tab-item>
        <tab-item class="vux-center">已支付订单</tab-item>
        <tab-item class="vux-center">待评价订单</tab-item>
      </tab>-->
		<!--<div class="content">-->
		<!-- 所有订单 -->
		<!--<mscroll v-show="index == 0"  @scroll="initData" list-name='alllist'>
                  <group>
                    <cell @click.native="show()"  v-for="(item,index) in list.alllist" :title="item" :key="index" is-link></cell>
                  </group>
               </mscroll>-->
		<!-- 未支付订单 -->
		<!--<mscroll v-show="index == 1"  @scroll="initData" list-name='nopaylist'>
                  <group>
                    <cell  v-for="(item,index) in list.nopaylist" :title="item" :key="index" is-link></cell>
                  </group>
               </mscroll>-->
		<!-- 已支付订单 -->
		<!--<mscroll v-show="index == 2"  @scroll="initData" list-name='paylist'>
                    <group>
                    <cell  v-for="(item,index) in list.paylist" :title="item" :key="index" is-link></cell>
                  </group>
               </mscroll>-->
		<!-- 待评价订单 -->
		<!--<mscroll v-show="index == 3"  @scroll="initData" list-name='pjlist'>
                    <group>
                    <cell  v-for="(item,index) in list.pjlist" :title="item" :key="index" is-link></cell>
                  </group>
               </mscroll>-->
		<!--<a @click="play()">{{ptext}}</a>-->
		<!--<div style="width:150px;height:150px;" @click='choseFile()'>
				<input type="file" ref='file'  capture="camcorder" @change="onFileChange" style="display: none;">
				<x-circle :percent="percent" :stroke-width="5" stroke-color="#04BE02">
					<span>{{ percent }}%</span>
				</x-circle>
			</div>-->
		<!--<paypsd :visible="visible" @on-forget="forget" @on-finish="finish"></paypsd>-->
		<!--</div>-->
		<!--<video id="video"  style="display:none"></video>-->
		<lwqu ref="wqu"></lwqu>
		<x-button @click.native="pay">确认支付</x-button>
		<x-button @click.native="sendRedPack">发送红包</x-button>
		<x-button @click.native="refund">支付退款</x-button>
		<x-button @click.native="test">测试</x-button>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, Cell, Group, XCircle, XButton } from "vux";
	import MeScroll from "@/components/mscroll/Mscroll";
	import paypsd from "@/components/paypassword/Paypassword";
	export default {
		components: {
			paypsd,
			XButton,
			mscroll: MeScroll,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Cell,
			Group,
			XCircle
		},
		created() {},
		data() {
			return {
				index: 0,
				visible: true,
				ptext: '播放',
				list: {
					alllist: [],
					nopaylist: [],
					paylist: [],
					pjlist: [],
				},
				//上传
				percent: 0
			};
		},
		mounted(){

		},
		methods: {
			//滚动加载
			initData(ms) {
				let page = ms.optUp.page.num;
				setTimeout(() => {
					if(page == 1) this.list[ms.listName] = [];
					for(let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
						this.list[ms.listName] = _.concat(this.list[ms.listName], (i + 1) + ms.listName);
					}
					ms.endByPage(10, 5);
				}, 1000);
			},
			//confirm弹出框
			show() {
				_g.floatMsg('分享给好友，可以砍一刀哦', {
					text: '放弃机会',
					style: '',
					onOk: () => {
						_g.toastMsg('放弃机会');
					}
				}, {
					text: '继续分享',
					onCancel: () => {
						_g.toastMsg('继续分享');
					}
				});
			},
			//视频播放
			play() {
				this.ptext = 'jiazaizhog'
				let video = document.getElementById('video');
				video.src = "http://jst.xsimon.com/uploads/ueditor/files/20180609/1528520863775564.mp4";
				video.play();
				video.onloadeddata = () => {
					this.ptext = '播放'
				}
			},
			//文件上传
			onFileChange(e) {
				let _this = this;
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				let file = files[0];
				let data = new FormData();
				data.append('is_auth', true);
				data.append('uid', win_admin_user.id);
				data.append('file', file);
				data.append('action', 'uploadimage');
				data.append('merchant_id', win_user.merchant_id);
				//进度百分比
				let config = {
					onUploadProgress: progressEvent => {
						this.percent = (progressEvent.loaded / progressEvent.total * 100 | 0)
					}
				}
				let url = this.$config.baseUrl + this.$config.apiUrl + "upload/upload";
				bus.$http.post(url, data, config).then((response) => {

				})
			},
			choseFile() {
				router.push({
					name: 'address'
				})
				return;
				this.$refs.file.click();
			},
			//支付键盘
			forget() {
				console.log('忘记密码了')
			},
			finish(p) {
				console.log(p)
				setTimeout(() => {
					this.visible = false;
				}, 2000)

				setTimeout(() => {
					this.visible = true;
				}, 4000)

			},
			//微信支付
			async pay() {
				this.$refs.wqu.show();
				return;
				let jsapiResult = await _g.apiRequest('wx_pay/getjsapiparameters', {
					merchant_id: win_user.merchant_id,
					openid: win_user.openid,
					appid: win_appid,
					body: '丽江一日游',
					out_trade_no: '20180224143528951321',
					total_fee: 0.01,
					notify_url: 'http://jst.xsimon.com/index.php/wxpay/notify/notify1',
				})
				if(jsapiResult.code == 0) {
					let payResult = await _g.pay(jsapiResult.data);
					console.log(payResult)
				} else {
					_g.floatMsg('', jsapiResult.msg);
				}
			},
			//发红包
			async sendRedPack(){
				let sendResult = await _g.apiRequest('wx_pay/sendredpack', {
					merchant_id: win_user.merchant_id,
					openid: win_user.openid,
					appid: win_appid,
					total_amount: 1,
					mch_billno: '20180224143528951328',
					wishing: '祝福语',
					act_name: '活动名称',
					remark: '活动备注',
				})
				if(sendResult.code == 0){
					console.log(sendResult.data)
				}else{
					_g.floatMsg('', sendResult.msg);
				}
			},
			//退款
			async refund(){
				let refundResult = await _g.apiRequest('wx_pay/refund', {
					merchant_id: win_user.merchant_id,
					total_fee: 0.01,
					refund_fee: 0.01,
					out_trade_no:'9Y0106212225041312',
					out_refund_no:_g.randStr(4)+moment()
				})
				if(refundResult.code == 0){
					console.log(refundResult.data)
				}else{
					_g.floatMsg('', refundResult.msg);
				}
			},
			//退款
			async test(){
				//进度百分比
						let cfg = {
							onUploadProgress: progressEvent => {
								console.log(progressEvent.loaded / progressEvent.total * 100 | 0)
							}
						}
						let uploadResult = await _g.apiRequest('wx_pay/tt', {}, cfg);
			}
		}
	};
</script>

<style lang="less">
	.test-box {
		.top {
			position: fixed;
			z-index: 10;
			width: 100%;
			top: 0;
		}
		.content {
			position: fixed;
			top: 50px;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.weui-cells {
			margin-top: 0px
		}
	}
</style>
