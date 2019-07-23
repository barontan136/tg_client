<template>
  <div class="wxmsg">
    <msg :title="title" :description="msg" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>
<script>
import { Msg, Divider, XButton } from 'vux'
export default {
	components: {
		Msg,
		Divider,
		XButton
	},
	props: {
		title: String,
		msg: String,
		icon: String,
		buttons: Array
	}
}
</script>
<style>
	.wxmsg{
		background: #FFFFFF;
		position: fixed;
		z-index: 999999999;
		height: 100%;
		top: 0px;
		width: 100%;
	}
</style>