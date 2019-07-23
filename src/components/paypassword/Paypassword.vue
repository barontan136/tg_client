<template>
	<div class="paypassword_box" v-show="visible">
		<div class="goods-psd">
			<p class="apply-title">{{title}}</p>
			<p class="apply-title_sub">{{msg}}</p>
			<div class="psd-container" v-if="ben=='false'">
				<input class="psd-input" :type="type" readonly v-for="(value,index) in passwordGroup" :key="index" :value="value.value">
			</div>
			<div class="psd-container" v-else>
				<p>{{err_title}}</p>
			</div>
			<div class="apply-footer">
				<div class="forget" @click="onForgetPsd" v-if="isset=='false'">忘记密码</div>
				<div class="showpsd"><img :src="'../../src/assets/images/'+src" @click="changeType()"/></div>
			</div>
			<div class="apply-but" v-if="isset=='true'">
                <flexbox>
			      <flexbox-item :span="6">
			      	<div class="flex-demo">
			      		<x-button mini type="primary" class="vux_qux" @click.native="cancelPas()">取消</x-button>
			      	</div>
			      </flexbox-item>
			      <flexbox-item>
			      	<div class="flex-demo">
			      		<x-button mini type="warn" class="vux_qud" @click.native="submitPas()">确定</x-button>
			      	</div>
			      </flexbox-item>
			    </flexbox>
			</div>
			
		</div>
		<div class="input-pan" v-if="ben=='false'">
			<div class="pan-num" v-for="(value,num) in number" :key="num" @click="inputPsd(value)">{{value}}</div>
		</div>
	</div>
</template>
<script>
	import '@/assets/css/public.less'
	import { XButton, Flexbox, FlexboxItem, Divider  } from 'vux'
	export default {
		components: {
		    XButton,
		     Flexbox,
		     FlexboxItem,
		     Divider
		  },
		data() {
			return {
				passwordGroup: [],
				type:'password',
				number: [1, 2, 3, 4, 5, 6, 7, 8, 9, '取消', 0, '删除'],
				pasgroup: [],
				src:"colse_eyes.png",
				currentInputIndex: -1
			}
		},
		props:{
		   visible:Boolean,
		   title:{
		   	type:String,
		   	default:'安全提醒'
		   },
		   msg:{
		   	type:String,
		   	default:'请输入6位兑换密码'
		   },
		   ben:{
		   	type:String,
		   	default:'false'
		   },
		   isset:{
		   	type:String,
		   	default:'false'
		   },
		   err_title:{
		   	type:String,
		   	default:'输入密码超过限制，请稍后再试！'
		   }
		},
		created() {
			this.initPasswordGroup();
		},
		methods: {
			initPasswordGroup() {
				this.passwordGroup = [];
				this.currentInputIndex=-1
				for(var i = 0; i < 6; i++) {
					this.passwordGroup.push({
						value: null
					})
				}
			},
			inputPsd(value) {
				switch(value) {
					case '取消':
						this.currentInputIndex = -1
						this.pasgroup = []
						this.initPasswordGroup()
						this.cancelPas()
						break;
					case '删除':
						this.pasgroup.pop()
						this.passwordGroup[this.currentInputIndex].value = null
						this.currentInputIndex--
						break;
					default:
					  if(this.currentInputIndex == 5) break;
						this.pasgroup.push(value)
						this.currentInputIndex++
						this.passwordGroup[this.currentInputIndex].value = value
				}
			},
			changeType(){
				if(this.type == "password"){
					this.type = "text";
					this.src = "open_eyes.png"
				}else{
					this.type = "password";
					this.src = "colse_eyes.png"
				}
			},
			onForgetPsd(){
				this.$emit('on-forget');
			},
			cancelPas(){
				this.currentInputIndex = -1
				this.pasgroup = []
				this.initPasswordGroup()
				this.$emit('on-cancel');
			},
			submitPas(){
				if(this.currentInputIndex == 5) {
					let psd = [];
					_.forEach(this.passwordGroup,(o)=>{
						psd = _.concat(psd,o.value);
					})
					this.$emit('on-finish',psd,2);
				} else{
					_g.toastMsg('请输入6位数字密码！');
				}
			},
		},
		watch: {
			currentInputIndex(val) {
				if(val == 5) {
					let psd = [];
					_.forEach(this.passwordGroup,(o)=>{
						psd = _.concat(psd,o.value);
					})
					this.$emit('on-finish',psd,1);
				} else if(val <= -1) {
					this.currentInputIndex = -1
				}
			},
			visible(value){
				if(!value){
					this.initPasswordGroup();
				}
			}
		}
	}
</script>
<style lang="less">
	.paypassword_box {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 999999999;
		background: rgba(53, 53, 53, 0.6);
		text-align: center;
		.apply-title {
			padding: 10px;
			font-size: 16px;
			font-weight: 600;
			color: #2f2e2e;
		}
		.apply-title_sub {
			color: #888;
		}
		.goods-psd {
			background: #fff;
			width: 90%;
			height: 200px;
			margin: 50px auto;
			border-radius: 10px;
		}
		.psd-container {
			width: 96%;
			height: 50px;
			margin: 10px 2% 0px;
			.psd-input {
				width: 15%;
				height: 40px;
				margin-left: 1%;
				border: none;
				text-align: center;
				font-size: 16px;
				font-weight: bold;
				border-bottom: 1px solid #ccc;
			}
		}
		.input-pan {
			position: absolute;
			bottom: 0;
			width: 100%;
			background: #fff;
		}
		.pan-num {
			width: 33%;
			display: inline-block;
			text-align: center;
			padding-top: 10px;
			padding-bottom: 10px;
			border-bottom: 1px solid #eee;
			border-right: 1px solid #eee;
			font-size:20px;
		}
		.apply-footer{
			width: 96%;
			margin:5px 2%;
			.forget{
				text-align: left;
				margin-left: 2%;
				float: left;
				width: 48%;
				color: #324cda;
			}
			.showpsd{
				text-align: right;
				margin-right: 2%;
				width: 48%;
				float: right;
				display: inline-block;
				img{
					width: 25%;
				}
			}
		}
		.apply-but{
			width:100%;
			margin-bottom: 10px;
    		.vux_qux{
    			border:1px solid #646466;
    			border-radius: 8px;
    			background: #fff;
    			color:#646466;
    			height: 29px;
    			line-height: 29px;
    			padding:0px 25px;
    			margin-left: 35px;
    		}
    		.vux_qud{
    			border:1px solid #ffcc01;
    			border-radius: 8px;
    			background: #ffcc01;
    			color:#8f571e;
    			height: 29px;
    			line-height: 29px;
    			float: right;
    			padding:0px 25px;
    			margin-right: 35px;
    		}
		}
	}
</style>