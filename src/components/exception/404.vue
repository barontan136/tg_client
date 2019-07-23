//******404页面
<template>
	<div class="notfoundvue">
		<img src="../../assets/images/system/404.png">
		<p>页面载入错误</p>
		<x-button>刷新重试</x-button>
	</div>
</template>
<script>
	import {XButton } from 'vux'
	export default {
		components: {
			XButton
		},
	}
</script>
<style lang="less">
	.notfoundvue{
		text-align: center;
		img{width: 60vw;margin-top: 12vh}
		p{margin-top:10px;color: #333333;font-size:16px;}
		.weui-btn_default {
			margin-top:20px;
			width: 45vw;
			font-size: 16px;
			color: #3366cc;
			border: 1px #8aa6de  solid;
			background-color:rgba(0, 0, 0, 0);
		}
	}
</style>