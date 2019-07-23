<template>
	<div class="notice_box" :id="id">
		<slot>
			<div style="color: #fff;">
				{{message}}
			</div>
		</slot>
		<p class="vux_colse" @click="hide">
			<x-icon type="ios-close-outline" size="30"></x-icon>
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: ''
			}
		},
		created() {
			this.id = _g.randStr(20);
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
		props: {
			message: String,
		},
	}
</script>

<style lang="less">
	.notice_box {
		background: rgba(0, 0, 0, 0.85);
		height: 100%;
		position: fixed;
		top: 0px;
		width: 100%;
		display: none;
		z-index: 1000000;
		.vux-x-icon {
			position: fixed;
			bottom: 10px;
			left: 45vw;
			fill: #fff;
		}
	}
</style>