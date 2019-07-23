import Vue from 'vue';
import Confirm from './confirm.vue';
const confirmConstructor = Vue.extend(Confirm);
const instance = new confirmConstructor({
    el: document.createElement('div')
});

confirmConstructor.prototype.hide = function () {
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
    typeof this.callback === 'function' && this.callback();
};

confirmConstructor.prototype.show = (options = {}) => {
	instance.content = options.content;
	instance.onConfirm =  ()=>{
		if(typeof options.onConfirm !== 'undefined'){
		        	options.onConfirm();
		        }
		instance.hide();
	};
	instance.onCancel  =  () => {
		        if(typeof options.onCancel !== 'undefined'){
		        	options.onCancel();
		        }
				instance.hide();
	}
	document.body.appendChild(instance.$el);
};

export default {
    show: instance.show,
    hide: instance.hide
};