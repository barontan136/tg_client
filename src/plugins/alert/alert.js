import Vue from 'vue';
import alert from './alert.vue';
const alertConstructor = Vue.extend(alert);
const instance = new alertConstructor({
    el: document.createElement('div')
});

alertConstructor.prototype.hide = function () {
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
    typeof this.callback === 'function' && this.callback();
};

alertConstructor.prototype.show = (options = {}) => {
	instance.bonuspoint = options.bonuspoint;
	instance.dkmoney = options.dkmoney;
	instance.maxdkmoney = options.maxdkmoney;
	instance.mixdkmoney = options.mixdkmoney;
	instance.costmoney = options.costmoney;
	instance.increasebonus = options.increasebonus;
	instance.maxincreasebonus = options.maxincreasebonus;
	instance.costgt = options.costgt;
	instance.onAlert  =  () => {
		        if(typeof options.onAlert !== 'undefined'){
		        	options.onAlert();
		        }
				instance.hide();
	}
	document.body.appendChild(instance.$el);
};

export default {
    show: instance.show,
    hide: instance.hide
};