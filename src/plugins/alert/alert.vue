<template>
  <div class="integral_box">
    <box class="button_box">
      <div class="vux_panel">
        <h4>———<span>抵扣积分规则</span>———</h4>
        <p>每{{bonuspoint}}积分抵扣{{dkmoney}}元</p>
        <p>最多可抵扣{{maxdkmoney}}元，最低消费：{{mixdkmoney}}元</p>
      </div>
      <div class="vux_panel">
      <h4>———<span>获得积分规则</span>———</h4>
        <p>每{{costmoney}}元获得{{increasebonus}}元积分</p>
        <p>最多获得{{maxincreasebonus}}积分，最低实付：{{costgt}}元</p>
      </div>
      <p class="vux_colse" @click="onAlert"><x-icon type="ios-close-outline" size="30"></x-icon></p>

    </box>

  </div>
</template>

<script>
import { Box, Divider} from 'vux'

export default {
  components: {
    Box,
    Divider
  },
  methods:{
  	onAlert(){
  		
  	}
  },
  props: {
		bonuspoint: String,
		dkmoney: String,
		maxdkmoney: String,
		mixdkmoney: String,
		costmoney: String,
		increasebonus: String,
		maxincreasebonus: String,
		costgt: String,
	},
}
</script>

<style lang="less">
.integral_box{
	background: rgba(0, 0, 0, 0.85);
	height: 100%;
	position: fixed;
	top:0px;
	width: 100%;
	z-index: 1000;
	.button_box{
		margin:40px 20px;
	}
	.vux_panel{
	    text-align:left;
	    margin: 15px auto 50px;
	}
	.vux_panel h4{
	    text-align:center;
	    margin: 20px auto;
	    color:#fff;
	    font-weight: 400;
	    font-size: 15px;
	    
	    
	}
	.vux_panel h4 span{
	    color:#fff;
	    font-size: 16px;
	    padding:0px 10px
	    
	}
	.vux_panel p{
	    color:#ffffff;
	    font-size: 14px;
	    padding:2px 10px;
	}
	.vux_colse{
		  text-align: center;
		  margin-top:75px
	}
	.vux-x-icon {
	  fill: #fff;
	}
}
</style>