<template>
  <div  class="delete_box">
    <box class="button_box">
      <div class="vux_panel">
      <p>{{content}}</p>
      <x-button type="warn" style="padding:5px 15px;" @click.native="onConfirm">确 定</x-button>
      </div>
      <x-button type="warn" style="background: #fff;color:#333;padding:5px 15px;border-radius: 0px;" @click.native="onCancel">取 消</x-button>
    </box>
  </div>
</template>

<script>
import { XButton, Box, Divider } from 'vux'

export default {
  components: {
    XButton,
    Box,
    Divider
  },
  props: {
		content: String,
	},
}
</script>

<style lang="less">
.custom-primary-red {
  border-radius: 99px!important;
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}
.delete_box{
	background: rgba(0, 0, 0, 0.6);
	height: 100%;
	width: 100%;
	position: fixed;
	z-index: 99999;
	top:0px;
	.vux_panel{
		background:#fff;
		width: 100%;
	    text-align: center;
	    margin: 0px auto;
	    border-radius:0px;
	    border-bottom: 6px solid #f4f4f4;
	}
	.vux_panel p{
		border-bottom: 1px solid #eee;
		padding:20px 10px;
		color:#999;
		font-size: 13px;
		}
	.button_box{
		position: absolute;
		bottom:0px;
		width:100%;
		text-align: center;
		}
	.button_box button{
		color:#E64340;
		background:#fff !important;
		font-size: 17px;
		}
	.weui-btn:after{border:none;}	
}
</style>