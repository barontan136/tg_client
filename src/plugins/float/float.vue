<template>
	<div class="alertconfirm_box">
		<div class="prompt_box_data" style="border-radius: 5px;">
			<h3 v-if="prompt.length>0">{{prompt}}</h3>
    		<flexbox :gutter="0" class="prompt_databox" style="background:#fff;border-radius: 5px;">
		      <flexbox-item>
		      	<div class="flex-demo prompt_ft">
		      		<p style="padding: 18px 10px 20px;color：#323233;">{{title}}</p>
		      	</div>
		      </flexbox-item>
		    </flexbox>
		    <flexbox :gutter="0" class="prompt_databoxs" style="padding:0px 0px;border-radius: 5px;margin-top:0px;background:#fff;">
		      <flexbox-item :span="6" @click.native="cancelBtn.onCancel()">
		      	<div class="flex-demo prompt_box_ft">
		      		<p :style="cancelBtn.style">{{cancelBtn.text}}</p>
		      	</div>
		      </flexbox-item>
		      <flexbox-item :span="6" @click.native="okBtn.onOk()">
		      	<div class="flex-demo prompt_box_fts">
		      		<p :style="okBtn.style">{{okBtn.text}}</p>
		        </div>
		      </flexbox-item>
		    </flexbox>
	    </div>
    </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from "vux";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider
  },

  props: {
  	prompt: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "消息提示"
    },
    cancelBtn: {
      type: Object,
      default: () => {
        return {
          text: "取消",
          style: "",
          onCancel: () => {}
        };
      }
    },
    okBtn: {
      type: Object,
      default: () => {
        return {
          text: "确定",
          style: "color:#323233",
          onOk: () => {}
        };
      }
    },
  }
};
</script>

<style lang="less">
/*弹出框样式*/
.alertconfirm_box {
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 999999;
    text-align: center;
    top:0px;
    background: rgba(0, 0, 0, 0.6);

  .prompt_databox {
    border-bottom: 1px solid #dddddd;
    border-radius: 15px 15px 0px 0px;
  }
  .prompt_databoxs {
    border-radius: 0px 0px 15px 15px;
    padding: 0px 0px;
  }
  .prompt_box_data {
    border-radius: 15px;
    background: #fff;
    padding: 0px 0px;
    width: 75%;
    margin: 45% auto;
  }
  .prompt_box_data h3{
    font-size: 18px;
    font-weight: 400;
    position: relative;
    top: 13px;
    color: #323233;
  }
  .prompt_box_ft {
    text-align: center;
  }
  .prompt_box_ft p {
    color: #646466;
    font-size: 17px;
    padding: 6px 10px;
  }
  .prompt_box_fts {
    text-align: center;
    border-left: 1px solid #cccccc;
    padding: 4px 0px;
  }
  .prompt_box_fts p {
    color: #fc9400;
    font-size: 17px;
    padding: 6px 10px;
  }
  .prompt_ft {
    text-align: center;
    padding-top: 5px;
  }
  .prompt_ft label {
    font-size: 17px;
    color: #333333;
  }
  .prompt_ft p {
    font-size: 16px;
    color: #646466;
    padding: 5px 10px;
    line-height: 19px;
  }
  .prompt_ft p span {
    font-size: 16px;
    color: #fc9400;
  }
  .vux-flex-row{
  	padding: 0px 0px;
  }
}
</style>