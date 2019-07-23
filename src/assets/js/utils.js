import Vue from 'vue'
import CryptoJS from 'crypto-js'
const utilsFn = {
	/**
	 * 异常跳转
	 */
	error() {
		router.push({
			path: "/exception"
		})
	},
	/**
	 *aes加密
	 */
	aesEncrypt(json) {
		let key = CryptoJS.enc.Utf8.parse(config.aesKey);
		let iv = CryptoJS.enc.Utf8.parse(config.aesIv);
		let res = CryptoJS.AES.encrypt(json, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC
		});
		return res.toString()
	},
	/**
	 *aes解密
	 */
	aesDecrypt(encrypted) {
		let key = CryptoJS.enc.Utf8.parse(config.aesKey);
		let iv = CryptoJS.enc.Utf8.parse(config.aesIv);
		var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
			mode: CryptoJS.mode.CBC,
			iv: iv,
		});
		decrypted = CryptoJS.enc.Utf8.stringify(decrypted); // 转换为 utf8 字符串
		return decrypted;
	},

	/**
	 * 关闭加载中
	 */
	closeLoading() {
		store.commit('isloading', false);
		store.commit('loadingmsg', '页面载入中...');
	},
	/**
	 *打开加载中
	 */
	showLoading(loadingmsg) {
		if(typeof loadingmsg == "undefined") {
			loadingmsg = "数据加载中..."
		}
		store.commit('isloading', true);
		store.commit('loadingmsg', loadingmsg);
	},

	/**
	 * 打开文字加载窗口
	 */
	showMsgLoading(text) {
		text = text || '数据加载中...'
		bus.$vux.loading.show({
			text: text
		})
	},
	/*
	 * 关闭文字加载窗口
	 */
	closeMsgLoading() {
		bus.$vux.loading.hide()
	},
	/**
	 * float提示框
	 */
	floatMsg(prompt, title, cancelBtn, okBtn) {
		bus.$float.show({
			prompt: prompt,
			title: title,
			cancelBtn: cancelBtn,
			okBtn: okBtn
		});
	},
	/**
	 *toast信息提示
	 *type	String	success		类型，可选值 success, warn, cancel, text
	 */
	toastMsg(content, type, timeout, callback) {
		if(typeof type == "undefined") type = 'text';
		if(typeof timeout == "undefined") timeout = 3000;
		if(timeout == "") timeout = 3000;
		bus.$vux.toast.show({
			text: content,
			type: type,
			isShowMask: true,
			time: timeout
		});
		if(typeof callback == "function") {
			setTimeout(() => {
				callback();
			}, timeout);
		}
	},

	/**
	 *提示页面
	    msg	String			描述文字
	 *  title	String			操作状态提示文字
		icon	String	success		图标类型，可选值有 success, warn, info, waiting
		buttons	Array			操作按钮列表，一个按钮对象包含text, type(default,primary,warn), link, onClick
	 */
	msgMsg(msg, title, icon, buttons) {
		bus.$msg.open({
			title: title,
			msg: msg,
			icon: icon,
			buttons: buttons
		});
	},
	//关闭所有页面
	closeAllMesg() {
		this.closeLoading();
		this.closeMsgLoading();
		bus.$float.hide();
		bus.$msg.close();
		//关闭打开的msg窗口
		bus.$confirm.hide();
	},
	/**
	 *关闭微信
	 */
	closeWx() {
		WeixinJSBridge.call('closeWindow');
	},
	/**
	 *get方法
	 */
	apiGet(url, callback, errcallback, isloading) {
		if(isloading === true || errcallback === true) {
			_g.showLoading();
		}
		url = url.substr(0, 4).toLowerCase() == "http" ? url : config.baseUrl + config.apiUrl + url;
		bus.$http.get(url).then((response) => {
			_g.closeLoading();
			_g.closeMsgLoading();
			if(isloading === true || errcallback === true) {
				_g.setTitle(route.meta.title);
			}
			if(response.data.code !== 0) {
				_g.toastMsg(response.data.msg, 'text', 2000, () => {
					if(typeof errcallback == "function") {
						let d = response.data.data;
						d.result_code = response.data.code;
						errcallback(d);
					}
				});
				return false;
			} else {
				if(response.data.msg !== 'success') {
					_g.toastMsg(response.data.msg, 'success', 2000, () => {
						if(typeof callback == "function") {
							callback(response.data.data)
						}
					});
				} else {
					if(typeof callback == "function") {
						callback(response.data.data)
					}
				}
			}
		})
	},
	/**
	 *post方法
	 */
	apiPost(url, data, callback, errcallback, isloading) {
		if(isloading === true || errcallback === true) {
			_g.showLoading();
		}
		url = url.substr(0, 4).toLowerCase() == "http" ? url : config.baseUrl + config.apiUrl + url;
		let cfg = {};
		if(typeof data.axiosConfig !== "undefined") {
			cfg = data.axiosConfig;
			delete data.axiosConfig;
		}
		// data = {
		// 	'lawnson_rsa_ticket_002': _g.aesEncrypt(JSON.stringify(data))
		// }
		bus.$http.post(url, data, cfg).then((response) => {
			_g.closeLoading();
			_g.closeMsgLoading();
			if(isloading === true || errcallback === true) {
				_g.setTitle(route.meta.title);
			}
			if(response.data.code !== 0) {
				_g.toastMsg(response.data.msg, 'text', 2000, () => {
					if(typeof errcallback == "function") {
						let d = response.data.data;
						d.result_code = response.data.code;
						errcallback(d);
					}
				});
				return false;
			} else {
				if(response.data.msg !== 'success') {
					_g.toastMsg(response.data.msg, 'success', 2000, () => {
						if(typeof callback == "function") {
							callback(response.data.data)
						}
					});
				} else {
					if(typeof callback == "function") {
						callback(response.data.data)
					}
				}
			}
		})
	},
	/**
	 *request方法
	 */
	apiRequest(url, data, cfg) {
		return new Promise((resolve, reject) => {
			url = url.substr(0, 4).toLowerCase() == "http" ? url : config.baseUrl + config.apiUrl + url;
			if(Object.prototype.toString.call(data) !== "[object FormData]") {
				data = {
					'lawnson_rsa_ticket_002': _g.aesEncrypt(JSON.stringify(data))
				}
			}
			if(typeof cfg == "undefined") {
				cfg = {}
			}
			bus.$http.post(url, data, cfg).then((response) => {
				resolve(response.data);
			})
		});
	},
	/**
	 *获取地理位置
	 */
	getLocation(callback, errcallback) {
		let geolocation = new qq.maps.Geolocation(config.mapKey, config);
		geolocation.getLocation(callback, errcallback, {
			timeout: 8000
		})
	},
	/**
	 *设置标题
	 */
	setTitle(title) {
		document.title = title;
		var i = document.createElement('iframe');
		i.style.display = 'none';
		i.onload = function() {
			setTimeout(function() {
				i.remove();
			}, 9)
		}
		document.body.appendChild(i);
		return title;
	},
	/**
	 * 随机字符串
	 * @param {Object} len
	 * 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1　
	 */
	randStr(len) {
		len = len || 32;　　
		let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		let maxPos = chars.length;　　
		let pwd = '';　　
		for(let i = 0; i < len; i++) {　　　　
			pwd += chars.charAt(Math.floor(Math.random() * maxPos));　　
		}　　
		return pwd;
	},

	/**
	 * 检查是否在微信端
	 */
	checkWeiXin() {
		let ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 检查是否有appid
	 */
	getAppid() {
		let appid = route.query.appid;
		if(_.isArray(appid)) {
			appid = appid[0];
		}
		let lockr_appid = Lockr.get('appid');
		if(!appid) {
			appid = lockr_appid;
			if(!appid) {
				return false;
			}
		}
		//如果没有缓存，请除用户所有记录
		if(!lockr_appid) {
			Lockr.clearAll();
			lockr_appid = appid;
			Lockr.set('appid', appid)
		}
		//如果页面和缓存的appid不一致(客户从一个公众号到另一个公众号，优先使用参数的appid)
		if(appid !== lockr_appid) {
			Lockr.clearAll();
			lockr_appid = appid;
			Lockr.set('appid', appid)
		}
		window.win_appid = appid;
		return appid;
	},
	/**
	 * 微信登录
	 */
	wxLogin() {
		let code = route.query.code;
		if(typeof code != "undefined") {
			this.apiPost("user/user", {
				code: code,
				appid: win_appid,
			}, function(data) {
				if(typeof(data.user) !== "undefined") {
					store.commit('user',data.user);
					Lockr.set('user', data.user);
					if(typeof(data.customer) !== "undefined") {
						store.commit('customer',data.customer);
						Lockr.set('customer', data.customer)
					}
					router.replace(route.fullPath);
					return false;
				} else {
					Lockr.remove('user');
					_g.toastMsg('登录失败，请退出后重试！');
					return false;
				}
			}, true);
		} else {
			let rollbackurl = encodeURIComponent(location.protocol + "//" + location.hostname + route.fullPath);
			let authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + win_appid
				+ "&redirect_uri=" + rollbackurl
				+ "&response_type=code&scope=snsapi_base&state=vue&component_appid=" + config.componentAppid
				+ "#wechat_redirect";
			location.replace(authUrl);
			return false;
		}
	},
	wxLoginService() {
		let authKey = Lockr.get('authKey');
		if(typeof authKey != "undefined") {
			let data = {
				'authKey': authKey,
				// 'ref_user_id': route.query.user_id
			}
			this.apiPost("user/wxuser", data, function(data) {
				Lockr.remove('authKey');
				if(typeof(data.user) !== "undefined") {
					// store.commit('user',data.user);
					Lockr.set('user', data.user);
					router.replace(route.fullPath);
					return false;
				} else {
					Lockr.remove('user');
					_g.toastMsg('信息已过期');
					return false;
				}
			}, true);
		} else {
			//生成authKey
			authKey = _g.randStr();
			Lockr.set('authKey', authKey);
			//记录跳转前的地址
			let url = config.baseUrl + config.apiUrl + "user/wxuser/appid/" + win_appid
				+ "/authKey/" + authKey
				+"/user_id/" + route.query.user_id
				+ "/backUrl/" + Base64.encode(encodeURIComponent(location.protocol + "//" + location.hostname + ":" + location.port + route.fullPath));
			location.replace(url);
			return false;
		}
	},

	/**
	 * 管理端登录
	 */
	adminUserLogin() {
		return new Promise(async(r, v) => {
			//根据openid 登录
			let res = await _g.apiRequest('admin_user/openidlogin', {
				openid: win_user.openid
			});
			if(res.code == 0) {
				let data = res.data;
				if(typeof data.id !== "undefined") {
					store.commit('admin_user',data);
					Lockr.set('admin_user', data);
					router.replace(route.fullPath);
					r(data);
					return;
				}else{
					Lockr.set('current_url', route.fullPath);
				}
				r(false)
			} else {
				r(false);
			}
		})
	},

	/**
	 *权限检测方法
	 */
	checkAuth(path) {
		return new Promise((resolve, reject) => {
			if(typeof win_admin_user.id === "undefined") {
				this.floatMsg('权限提示', '您还未登录', {
					onCancel: () => {
						router.go(-1)
					}
				}, {
					text: '现在登录',
					onOk: () => {
						router.replace('/mp_mplogin')
					}
				});
				resolve('您还未登录');
				return;
			} else {
				if(win_admin_user.is_admin == 1) {
					resolve(true);
					return;
				}
				if(typeof path == "undefined") {
					path = route.path
				}
				let data = {
					'lawnson_rsa_ticket_002': _g.aesEncrypt(JSON.stringify({
						uid: win_admin_user.id,
						auth: path
					}))
				}
				let url = 'auth_vue/auth';
				url = url.substr(0, 4).toLowerCase() == "http" ? url : config.baseUrl + config.apiUrl + url;
				bus.$http.post(url, data).then((response) => {
					if(response.data.code == 0) {
						resolve(true);
						return;
					} else {
						this.floatMsg('权限提示', response.data.msg, {
							onCancel: () => {
								router.go(-1)
							}
						}, {
							onOk: () => {
								router.go(-1)
							}
						});
						resolve(response.data.msg);
						return;
					}
				})

			}
		});
	},

	/***************获取jsskd*****************/
	jssdk(jsApiList, flag) {
		let url = location.href;
		let isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
		if(isIOS) {
			url = win_entryUrl;
		}
		if(typeof flag == "undefined") {
			flag = false
		}
		this.apiPost('wechat/jssdk', {
			'url': url,
			'appid': win_appid
		}, (data) => {
			wx.config({
				debug: flag,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: jsApiList
			});
		})
	},
	/*****************************路由切换*************/
	transaction(route, redirect) {
		/**切换动画效果**/
		let locationPath = Lockr.get('locationPath') || [];
		/**获取当前路由是否在地址池中**/
		let currentPath = _.findIndex(locationPath, function(o) {
			return o == route.path;
		});
		/**获取之前的路由是否在地址池中**/
		let prePath = _.findIndex(locationPath, function(o) {
			return o == redirect.path;
		});
		if(prePath !== -1 && currentPath !== -1) {
			_.remove(locationPath, function(o) {
				return o == redirect.path;
			});
			store.commit('transitionname', 'slide-right');
		} else {
			store.commit('transitionname', 'slide-left');
		}
		//如果当前路由不在地址池中
		if(currentPath === -1) {
			locationPath = _.concat(locationPath, route.path);
		}
		Lockr.set('locationPath', locationPath);
	},
	/**********积分优惠计算****************/
	bonusOffsetPrice(bonusRule, orderMoney, userBonus, least_money_to_use_bonus) {
		return new Promise((r, v)=> {
			let res = {
				offset_price: 0,
        min_use_bonus: 0,
        is_can_use:false
			};
      if(least_money_to_use_bonus >= bonusRule.least_money_to_use_bonus) {//达到消费门槛
        res.is_can_use = true;
        if(orderMoney > 0){
          //倍数计算
          // let max_use_bonus = 0;//最大使用数量
          // let max_offset_price = 0;//最大抵扣金额
          // let bonus_multiple = 0;//积分整倍数
          // bonus_multiple = parseInt(userBonus/bonusRule.cost_bonus_unit);//最大倍数值
          // while(bonus_multiple>0){
          //   max_use_bonus = parseInt(bonus_multiple*bonusRule.cost_bonus_unit);//当前倍数使用积分数量
          //   max_offset_price = parseInt(bonus_multiple * bonusRule.reduce_money);//当前倍数最大抵扣金额
          //   if(max_offset_price <= orderMoney && max_offset_price <= bonusRule.max_reduce_money){
          //     res.min_use_bonus = max_use_bonus;
          //     res.offset_price = max_offset_price;
          //     bonus_multiple = 0;
          //   }
          //   bonus_multiple--;
          // }
          //使用积分计算
          let max_use_bonus = 1;//最大使用数量
          let max_offset_price = 0;//最大抵扣金额
          let is_ok = true;
          while(is_ok){
            max_offset_price = Math.round(max_use_bonus* (bonusRule.reduce_money / bonusRule.cost_bonus_unit));//当前积分最大抵扣金额
            if(max_use_bonus<= userBonus && max_offset_price <= orderMoney && max_offset_price <= bonusRule.max_reduce_money){
              res.min_use_bonus = max_use_bonus;
              res.offset_price = max_offset_price;
            }else{
              is_ok = false;
            }
            max_use_bonus++;
          }
        }
      }
      r(res);
    })
	},
	pay(data) {
		return new Promise((resolve, reject) => {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', {
					appId: data.appId,
					timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
					package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: data.paySign, // 支付签名
				},
				function(res) {
					if(res.err_msg === "get_brand_wcpay_request:ok") {
						resolve(true);
						return;
					} else {
						resolve(false)
						return;
					}
				}
			);
		})
	},
	/**
	 *表单数据验证
	 *vue:vue实例,一般传入this即可
	 *begin:为ref的前缀,如:ref="xxxx_name",则begin为xxxx_
	 */
	valid(vue, begin) {
		return new Promise((resolve, reject) => {
			let valids = vue.$refs;
			_.forEach(valids, (o, k) => {
				if(_.startsWith(k, begin)) {
					if(o.firstError == undefined && o.required) {
						o.firstError = "必填项不能为空";
					}
					if(!o.valid) {
						let error = o.firstError;
						if(error == "必填哦") {
							error = "必填项不能为空";
						}
						o.focus();
						resolve(error);
						return false;
					}
				}
			})
			resolve(true);
		})
	}
}

export default utilsFn
