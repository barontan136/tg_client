<template>
		<clocker v-if="isShow">
			<span class="day">{{hour}}</span>
			<span style="position: relative;left:0%;">:</span>
			<span class="day">{{min}}</span>
			<span style="position: relative;left:0%;">:</span>
			<span class="day">{{sec}}</span>
			<span style="position: relative;left:0%;color:#636366;font-size:12px;">后结束</span>
		</clocker>
</template>

<script>
	import {Clocker} from "vux";
	export default {
		components: {
			Clocker
		},
		data(){
			return{
				isShow:false,
				hour:0,
				min:0,
				sec:0,
			}
		},
		created(){
			this.times = parseInt(this.times);
			if(this.status == 2){
			   this.countdown();
		     }
		},
		props:{
			times:{
				type:Number,
				default:0,
			},
			status:{
				type:Number,
				default:0,
			}
		},
		methods:{
			//倒计时
			countdown(){
				    let self = this;
				    let times = this.times;
					let timer = setInterval(()=>{
						if(times > 0) {
							let hour = Math.floor(times / 3600);
							let min = Math.floor((times / 60) % 60);
							let sec = Math.floor(times % 60);
							self.hour = hour < 10 ? "0" + hour : hour;
							self.min = min < 10 ? "0" + min : min;
							self.sec = sec < 10 ? "0" + sec : sec;
							self.isShow = true;
							times--;
						} else {
							this.isShow = false;
							clearInterval(timer);
						}
					}, 1000);
			},
		}
	};
</script>

<style lang="less">

</style>