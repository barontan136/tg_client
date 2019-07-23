<template>
	<div class="hisinfo-box" >
	  <iframe frameborder=0 id="hisinfoiframe" name="showHere" :src="src" class="ifr" scrolling=auto ></iframe>
	</div>
</template>

<script>
	export default {
	  data () {
	    return {
	      src:''
	    }
	  },
	  created(){
	  	if(typeof route.params.src == "undefined"){
	  		router.go(-1)
	  		return;
	  	}
	  	this.src = route.params.src;
	  	_g.setTitle(route.params.title)
	  }
    }
</script>

<style  lang="less">
.hisinfo-box{
	background:#fff;
	top: 46px;
	bottom: 0px;
	position: fixed;
	width: 100%;
	@height: 100%-46px;
	.ifr{
    width: 100%;
	height: 100%;	
	background:#fff;
	}
}
</style>