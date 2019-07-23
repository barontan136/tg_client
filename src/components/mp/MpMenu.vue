<template>
	<!--底栏菜单 -->
	<div class="vux_mpmenu">
		<tabbar>
			<tabbar-item :selected="mpmenu == 1" link="/up_material">
				<p slot="label">上传素材</p>
			</tabbar-item>
			<tabbar-item :selected="mpmenu == 2" link="/gold_price">
				<p slot="label">设置金价</p>
			</tabbar-item>
			<tabbar-item :selected="mpmenu == 3" link="/electron_policy">
				<p slot="label">电子保单</p>
			</tabbar-item>
			<tabbar-item :selected="mpmenu == 4" link="/admin_query">
				<p slot="label" style="border-right:none;">提货查询</p>
			</tabbar-item>
		</tabbar>
	</div>	
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
			mpmenu() {
				return this.$store.state.mpmenu;
			}
		}
	};
</script>

<style lang="less">
.vux_mpmenu{
	.weui-tabbar{
		background: #fff;
		border-top: 1px solid #eee;
	}
	.weui-tabbar__label p{
		font-size: 15px;
		border-right: 1px solid #eee;
		height: 30px;
		margin: 10px 0px;
		line-height: 30px;
	}
}
</style>