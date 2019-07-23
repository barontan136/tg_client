//消息提示
import Msg from "./message/message";
//Confirm提示框
import Confirm from "./confirm/confirm";
//alert提示框
import Alert from "./alert/alert";
//日历组件
import Calendar from "./calendar/Calendar";
//notice
import Notice from './notice/Notice';
//mask
import Mask from './mask/Mask';
//float提示框
import Float from "./float/float";
//二维码
import Wqu from "./wechatqrcode/WechatQrcode";

window.document.addEventListener('touchstart', function(event) {
	/* Do Nothing */
}, false);

const install = function(Vue) {
	Vue.component('notice',Notice);
	Vue.component('lmask',Mask);
	Vue.component('lwqu',Wqu);
	Vue.component('ls-calendar', Calendar);
	
	Vue.prototype.$msg = Msg;
	Vue.prototype.$confirm = Confirm;
	Vue.prototype.$alert = Alert;
	Vue.prototype.$float = Float;
	Vue.prototype.$wqu = Wqu;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};