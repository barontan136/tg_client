<!--
配置请参考
http://www.mescroll.com/api.html
-->

<template>
	<div :id="mescroll_id" class="mescroll">
		<slot>
			<div></div>
		</slot>
	</div>
</template>

<script>
	import MeScroll from "mescroll.js";
	import "mescroll.js/mescroll.min.css";
	export default {
		data() {
			return {
				mescroll_id: 'mescroll_' + _g.randStr(20),
				ms: null,
				toTop: {
					src: '../../src/assets/images/top.png',
					offset: 100
				},
				page: null,
			}
		},
		props: {
      listName: String,
      end_line_text: {
       type:String,
       default:'我也是有底线的'
      },
			usedown: { //是否开启下拉刷新
				type: Boolean,
				default: true,
			},
			autoload: { //是否载入加载数据
				type: Boolean,
				default: true,
			},
			totop: {
				type: Boolean,
				default: false
			},
		},
		activated() {
			if(this.totop) {
				document.querySelectorAll(".mescroll-totop").forEach((img) => {
					img.style.display = '';
				});
			}
		},
		methods: {
			down() {
				this.ms.resetUpScroll();
				this.$emit('scroll', this.ms)
			},
			up() {
				this.$emit('scroll', this.ms)
			},
		},
		mounted() {
			let options = {
				//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
				//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
				down: {
					callback: this.down, //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
					auto: false,
					use: this.usedown,
				},
				up: {
					callback: this.up, //上拉加载的回调
					htmlNodata: '<p class="upwarp-nodata">'+this.end_line_text+'</p>',
					auto: this.autoload,
					page: {
						num: 0,
						size: 10,
						time: null
					},
				}
			}
			if(this.totop) {
				options.up.toTop = this.toTop;
			}
      this.ms = new MeScroll(this.mescroll_id, options);
			this.page = this.ms.optUp.page;
      this.ms.listName = this.listName;
		},
		watch: {
			page: {
				handler(p) {
					if(p.num <= 1) {
						this.ms.upwarp.innerText = "";
					}
				},
				deep: true
			}
		}
	};
</script>

<style type="less">
	.mescroll{ height: 100%; -webkit-box-sizing: border-box; box-sizing: border-box;}
</style>
