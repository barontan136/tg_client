<template>
	<div id="app">
		<div slot="tip" class="app-div" v-show="isloading">
			<img class="app-loading" src="../src/assets/svg/load16.svg" />
			<p>{{loadingmsg}}</p>
		</div>
		<transition>
			<keep-alive>
				<router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition>
			<router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<!--底栏菜单 -->
		<mall-menu v-if="menushow"></mall-menu>
		<mp-menu v-if="mpmenushow"></mp-menu>
		<!--/底栏菜单 -->
	</div>
</template>

<script>
	import MallMenu from "@/components/mall/MallMenu";
	import MpMenu from "@/components/mp/MpMenu";
	import "@/assets/css/font-awesome.min.css";
	export default {
		name: "app",
		components: {
			'mall-menu': MallMenu,
			'mp-menu': MpMenu
		},
		computed: {
			isloading() {
				return this.$store.state.isloading;
			},
			loadingmsg() {
				return this.$store.state.loadingmsg;
			},
			transitionname() {
				return this.$store.state.transitionname;
			},
			menushow() {
				return this.$store.state.menushow;
			},
			mpmenushow() {
				return this.$store.state.mpmenushow;
			}
		}
	};
</script>

<style lang="less">
	/*掩藏滚动条*/
	::-webkit-scrollbar {display:none}
    ::-webkit-scrollbar{width:0px}
	@import "~vux/src/styles/reset.less";
	body {
		-webkit-overflow-scrolling : touch;
		font: 14px/1.6 "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
		.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
		.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,
		.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
			color: #fc9400
		}
		.weui-tabbar:before {
			border-top: none;
		}
		.weui-tabbar {
			position: fixed;
		}
		.child-view {
			width: 100vw;
			max-width: 100vw;
			min-height: 100vh;
			overflow-x: hidden;
			transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1.0);
		}
		.slide-left-enter,
		.slide-right-leave-active {
			opacity: 0;
			-webkit-transform: translate(100vw, 0);
			transform: translate(100vw, 0);
		}
		.slide-left-leave-active,
		.slide-right-enter {
			opacity: 0;
			-webkit-transform: translate(-100vw, 0);
			transform: translate(-100vw, 0);
		}
		.app-div {
			position: fixed;
			width: 100vw;
			top: 0px;
			bottom: 0px;
			z-index: 999999999;
			text-align: center;
			background: rgba(255, 255, 255, 0.89);
		}
		.app-div img {
			width: 10%;
			margin-top: 50%
		}
		.app-div p {
			color: #fc9400;
		}
		.vux-slider>.vux-indicator>a>.vux-icon-dot.active,
		.vux-slider .vux-indicator-right>a>.vux-icon-dot.active {
			background-color: #fc9400;
		}
		.vux-popup-header-right {
			color: #fc9400;
		}
		.dp-header .dp-item.dp-right {
			color: #fc9400;
		}
		//表单验证不显示右边感叹号
		.weui-icon-warn{
			display: none !important;
		}
	}
</style>
