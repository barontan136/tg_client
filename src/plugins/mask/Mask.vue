<template>
	 <div class="mask_box" :id="id">
	 	<slot>
			<div></div>
		</slot>
	 </div>
</template>
<script>
export default {	
  data(){
    return {
		id:''
	}
  },
  created(){
   this.id = _g.randStr(20);
  },
  methods:{
  	hide(){
  		document.body.style.position = "relative";
  		document.getElementById(this.id).style.display = "none";
  	},
  	show(){
  		document.body.style.position = "fixed";
  		document.getElementById(this.id).style.display = "block";
  	}
  },
}  
</script>
<style lang="less">
	.mask_box{
			width: 100%;
		    background: rgba(0, 0, 0, 0.6);
		    position: fixed;
		    height: 100%;
		    z-index: 998;
		    display: none;
		    top: 0;
	}
</style>