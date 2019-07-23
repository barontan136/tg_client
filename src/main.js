import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import Plugins from '@/plugins/plugins';
import _ from 'lodash'
import Lockr from 'store'
import moment from 'moment'
import _g from '@/assets/js/utils';
import Base64 from '@/assets/js/base64';
import config from '@/assets/js/config';
import store from '@/vuex/store'
import App from './App'
import wx from 'weixin-js-sdk'
import VueLazyLoad from 'vue-lazyload'
import { SubmitBar,Popup,Field,CellGroup,Dialog,Toast
	,Cell,RadioGroup,Radio,Row, Col,Button } from 'vant';
import 'vant/lib/index.css';
import VueWechatTitle from 'vue-wechat-title';
import {
	ToastPlugin,
	AjaxPlugin,
	LoadingPlugin
} from 'vux'
Vue.use(VueWechatTitle)
Vue.use(AjaxPlugin)
Vue.use(Plugins)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueLazyLoad, {
	loading: './src/assets/svg/load9.svg'
})
Vue.use(SubmitBar);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Radio).use(RadioGroup);
Vue.use(Row).use(Col);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Toast);
const bus = new Vue();
window.Base64 = Base64;
window.bus = bus;
window.router = router;
window.store = store;
window.config = config;
Vue.prototype.$config = config;
window._g = _g;
Vue.prototype.$_g = _g;
window._ = _
Vue.prototype.$_ = _;
window.Lockr = Lockr
Vue.prototype.$Lockr = Lockr;
window.moment = moment
Vue.prototype.$moment = moment;
window.pageSize = 10
window.wx = wx
//获取当前
window.win_baseUrl = location.protocol + "//" + location.hostname;
if(process.env.NODE_ENV === 'development') { //测试环境
	win_baseUrl += ":" + location.port;
	Lockr.set('appid', 'wxe0deba39657a483b');
} else { //正式环境
	Lockr.set('appid', 'wxe0deba39657a483b');
}
//移动端点击事件300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach(async(route, redirect, next) => {
	// 记录进入app时的url,ios下分享页面链接只有这一个
    if (typeof window.win_entryUrl === 'undefined' || window.win_entryUrl === '') {
        window.win_entryUrl = location.href;
    }
	window.route = route;
	window.fromroute = redirect;
	//关闭所有弹框
	_g.closeAllMesg();
	//隐藏回到顶端
	document.querySelectorAll(".mescroll-totop").forEach((img)=>{
		img.style.display= 'none';
	});
	//测试用数据
	// Lockr.set('appid', 'wxe0deba39657a483b')
	// Lockr.set('user', {"user_id":"11","openid":"ojYBk1lZ6PhEI9iAqEmv2kwPnokc","isSubscribe":true,"register_time":"2019-05-19 13:01:22","telephone":"","birthday":"","name":"","xaddress":"","is_bind":0,"subscribe":1,"headimgurl":"http://thirdwx.qlogo.cn/mmopen/rFyvcl3A4Jibw6ribSCJhHXJ4A4H09lzYEzH1aB7ic68Dl1sAqlL7xvzmbwFvgk56EjHagfTiaoJclumlunzaKMj95AOmhwV4XH1/132","nickname":"飘零","sex":"男","area":"中国昆明"})
	
	//显示加载中图标
	store.commit('isloading', true);
	//效果切换
	_g.transaction(route, redirect);
	const isCheckAppid = typeof route.meta.isCheckAppid === "undefined" ? true : route.meta.isCheckAppid;
	const appid = _g.getAppid();

	if(isCheckAppid) {
		if(appid === false) {
			console.log('appid is false');
			_g.error();
			return;
		}
		// //控制是否显示商城菜单
		// const menushow = typeof route.meta.menushow === "undefined" ? false : route.meta.menushow;
		// store.commit('menushow', menushow);
		// //控制是否显示管理端主菜单
		// const mpmenushow = typeof route.meta.mpmenushow === "undefined" ? false : route.meta.mpmenushow;
		// store.commit('mpmenushow', mpmenushow);

		const isMustWeiXin = typeof route.meta.isMustWeiXin === "undefined" ? true : route.meta.isMustWeiXin;
		//如果是微信浏览器，直接获取微信认证信息
		let isWeiXin = _g.checkWeiXin();
		let user = Lockr.get('user');
		console.log(user);
		// let user = store.state.user;
		window.win_user = user;
		if(isWeiXin) {
			if(!user) {
				//微信自动登录
				// _g.wxLoginService();
				if(process.env.NODE_ENV === 'development') { //测试环境
					_g.wxLoginService()
				} else {
					_g.wxLoginService();
					//_g.wxLogin();	// 服务商模式可以这样用
				}
				return;
			}
		} else {
			if(isMustWeiXin) {
				_g.toastMsg('请在微信端打开', 'text', 2000, () => {
					_g.error();
				});
				store.commit('isloading', false);
				store.commit('menushow', false);
				return false;
			}
		}
		//判断是否需要后台权限
		// const auth = typeof route.meta.auth === "undefined" ? false : route.meta.auth;
		// if(auth) {
		// 	//let admin_user = Lockr.get('admin_user');
		// 	let admin_user = store.state.admin_user;
		// 	if(!admin_user == "undefined" || !admin_user.id) {
		// 		//管理人员自动登录
		// 		let autoLogin = await _g.adminUserLogin();
		// 		if(autoLogin !== false){
		// 			admin_user = autoLogin;
		// 		}else{
		// 			router.replace('/mp_mplogin');
		// 			return;
		// 		}
		// 	}
		// 	window.win_admin_user = admin_user;
		// }
	}else{
		let user_tmp = {
			'user_id' : 1,
			'merchant_id' : 1,
			'merchant_name' : '商户名称',
			'merchant_shop_id' : 1,
			'openid' : 'oPkBUtwDJe0etJqfSexD3lFYo8UM',
		};
		// window.win_user = user_tmp;
	}
	next();
});

router.afterEach(route => {
	//页面标题
	const title = route.meta && route.meta.title || false;
	//设置标题
	if(title) {
		_g.setTitle(title);
	}
	store.commit('isloading', false);
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box')