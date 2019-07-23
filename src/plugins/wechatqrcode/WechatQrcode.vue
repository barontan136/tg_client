<template>
	<div class="wechatqrcode_box" :id="id">
		<slot>
			<div class="content_erm">
				<img :src="url" />
				<div class="gztext">长按识别二维码关注公众号</div>
				<x-icon type="ios-close-outline" size="30" @click.native="hide()"></x-icon>
			</div>
		</slot>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				id: '',
				url: ''
			}
		},
		mounted() {
			this.id = _g.randStr(20);
			_g.apiPost('wechat/getqrcodeurl', {
				appid: win_appid
			}, (url) => {
				this.url = url;
			})
		},
		methods: {
			hide() {
				document.body.style.position = "relative";
				document.getElementById(this.id).style.display = "none";
			},
			show() {
				document.body.style.position = "fixed";
				document.getElementById(this.id).style.display = "block";
			}
		},
	}
</script>
<style lang="less">
	.wechatqrcode_box {
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		height: 100%;
		z-index: 998;
		display: none;
		top: 0;
		text-align: center;
		.vux-x-icon {
			fill: #fff !important;
			position: absolute !important;
			right: 40px !important;
			top: 13% !important;
			color: rgb(255, 255, 255) !important;
			float: right !important;
		}
		.content_erm {
			margin-top: 25% !important;
            padding-top: 15% !important;
			.gztext {
				color: #fff;
				font-size: 16px;
			};
			img{
				width: 70vw;
			}
		}
	}
</style>