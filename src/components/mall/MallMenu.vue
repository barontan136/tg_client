<template>
	<!--底栏菜单 -->
	<tabbar>
		<tabbar-item :selected="mallmenu == 1" link="/index">
			<img v-if="mallmenu == 1" slot="icon" src="../../assets/images/mall/home.png" />
			<img v-else slot="icon" src="../../assets/images/mall/homes.png" />
			<span slot="label">商城首页</span>
		</tabbar-item>
		<tabbar-item :selected="mallmenu == 2" link="/card_customized">
			<img v-if="mallmenu == 2" slot="icon" src="../../assets/images/mall/customizeds.png"/>
			<img v-else slot="icon" src="../../assets/images/mall/customized.png"/>
			<span slot="label">金卡定制</span>
		</tabbar-item>
		<tabbar-item :selected="mallmenu == 3" link="/my_order">
			<img v-if="mallmenu == 3" slot="icon" src="../../assets/images/mall/orders.png"/>
			<img v-else slot="icon" src="../../assets/images/mall/order.png"/>
			<span slot="label">我的订单</span>
		</tabbar-item>
	</tabbar>
	<!--/底栏菜单 -->
</template>

<script>
	import { Tabbar, TabbarItem } from "vux";
	import "@/assets/css/font-awesome.min.css";
	export default {
		components: {
			Tabbar,
			TabbarItem
		},
		computed: {
			mallmenu() {
				return this.$store.state.mallmenu;
			}
		}
	};
</script>

<style lang="less">

</style>
