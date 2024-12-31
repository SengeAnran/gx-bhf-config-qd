import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import { getDicts } from "@/api/system/dict/data";
import './assets/icons' // icon
import './permission' // permission control
import moment from 'moment'
import plugins from './plugins' // plugins

// 分页组件
import Pagination from "@/components/Pagination";

// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"

// 头部标签组件
import VueMeta from 'vue-meta'

import BConfirm from '@/components/BaseConfirm/confirmPromise'
// // 字典数据组件
import DictData from "@/components/DictData";
//全局组件
import components from '@/utils/components.js'

import { selectDictLabel, selectDictLabels } from "@/utils/ruoyi";


// 全局方法挂载
Vue.prototype.$BConfirm = BConfirm
Vue.prototype.getDicts = getDicts;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.moment = moment
DictData.install();

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)

//全局组件使用
Vue.use(components)

Vue.use(directive)
Vue.use(VueMeta)
Vue.use(plugins)


Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
