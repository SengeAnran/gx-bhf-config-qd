import Vue from 'vue'
import confirm from './index'
import store from '@/store'

const ConfirmConstructor = Vue.extend(confirm)
const BConfirm = function(options) {
  return new Promise(resolve => {
    const confirmDom = new ConfirmConstructor({
      el: document.createElement('div'),
      // store: this.$store
      store: store
    })
    confirmDom.options = {
      ...confirmDom.options,
      ...options
    }
    document.body.appendChild(confirmDom.$el)
    Vue.nextTick(() => {
      confirmDom.isShow = true
    })
    confirmDom.sure = function() {
      resolve(true)
      confirmDom.isShow = false
      document.body.removeChild(confirmDom.$el)
    }
    confirmDom.cancel = function() {
      resolve(false)
      confirmDom.isShow = false
      document.body.removeChild(confirmDom.$el)
    }
  })
}
export default BConfirm
