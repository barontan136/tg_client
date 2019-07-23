import Vue from 'vue';
import VueMsg from './message.vue';
const msgConstructor = Vue.extend(VueMsg);
const instance = new msgConstructor({
    el: document.createElement('div')
});

msgConstructor.prototype.closeMsg = function () {
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
    typeof this.callback === 'function' && this.callback();
};

msgConstructor.prototype.showMsg = (options = {}) => {
    instance.title = options.title || '信息提示';
	instance.icon = options.icon || 'success';
	instance.msg = options.msg;
	instance.buttons = options.buttons || [{
		type: 'primary',
		text: '确 定',
		onClick: () => {
				router.go(-1)
		}
	}]
	document.body.appendChild(instance.$el);
};

export default {
    open: instance.showMsg,
    close: instance.closeMsg
};