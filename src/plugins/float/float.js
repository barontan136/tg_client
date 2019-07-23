import Vue from 'vue';
import float from './float.vue';
const floatConstructor = Vue.extend(float);
const instance = new floatConstructor({
  el: document.createElement('div')
});

floatConstructor.prototype.hide = function () {
	document.body.style.position = "relative";
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);
  typeof this.callback === 'function' && this.callback();
};

floatConstructor.prototype.show = (options = {}) => {
	document.body.style.position = "fixed";
	instance.prompt = options.prompt || '';
  instance.title = options.title || '';
  let okBtn = options.okBtn || {};
  let cancelBtn = options.cancelBtn || {};
  instance.okBtn ={
      text:  okBtn.text || '确定',
      style: okBtn.style || '',
      onOk: () => {
        if (typeof okBtn.onOk == "function") {
            okBtn.onOk();
        }
        instance.hide();
      }
  }
  instance.cancelBtn ={
      text: cancelBtn.text || '取 消',
      style: cancelBtn.style || '',
      onCancel: () => {
        if (typeof cancelBtn.onCancel == "function") {
            cancelBtn.onCancel();
        }
        instance.hide();
      }
  }
  document.body.appendChild(instance.$el);
};

export default {
  show: instance.show,
  hide: instance.hide
};
