/**
 * meta 标识
 * title:网页标题 String
 * isMustWeiXin:是否判断必须在微信浏览器中打开，不配置默认为true Boolean
 * isCheckAppid:是否必须检查appid,,不配置默认为true Boolean
 * menushow:是否显示主菜单,不配置默认为false
 * mpmenushow:是否显示管理端菜单,不配置默认为false
 * auth：管理端权限
 */
import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

export default new Router({
	base: __dirname,
	mode: 'history',
	routes: [{
			path: '',
			redirect: '/center'
		},
		{
			path: '/test',
			name: 'test',
			component: resolve => require(['@/view/groupbuy/Test'], resolve),
			meta: {
				title: '测试',
				// isMustAuth: true,
				isCheckAppid: false
			}
		},
		//--------商城首页  start----------------//
		{
			path: '/index',
			name: 'index',
			component: resolve => require(['@/view/groupbuy/Index'], resolve),
			meta: {
				title: '活动首页',
				// menushow: true,
				// isCheckAppid: false
			}
		},
		//--------商城首页  start----------------//
		{
			path: '/buy',
			name: 'buy',
			component: resolve => require(['@/view/groupbuy/Buy'], resolve),
			meta: {
				title: '活动首页',
				// menushow: true,
				// isCheckAppid: false
			}
		},
		//--------商城首页  start----------------//
		{
			path: '/parttime',
			name: 'parttime',
			component: resolve => require(['@/view/groupbuy/parttime'], resolve),
			meta: {
				title: '兼职首页',
				// menushow: true,
				// isCheckAppid: false
			}
		},
        //--------订单列表  start----------------//
        {
            path: '/orderlist',
            name: 'orderlist',
            component: resolve => require(['@/view/groupbuy/orderlist'], resolve),
            meta: {
                title: '订单列表',
                // menushow: true,
                // isCheckAppid: false
            }
        },
        //--------无权限  start----------------//
        {
            path: '/competence',
            name: 'competence',
            component: resolve => require(['@/view/groupbuy/competence'], resolve),
            meta: {
                title: '',
                // menushow: true,
                // isCheckAppid: false
            }
        },
	],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			if(from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return {
				x: 0,
				y: to.meta.savedPosition || 0
			}
		}
	}
})
