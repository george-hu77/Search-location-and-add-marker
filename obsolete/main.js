//引入Vue
import Vue from 'vue'
//import { createApp } from 'vue';
import Antd from 'ant-design-vue'
//引入App
import App from './App.vue'
//引入插件
import vueResource from 'vue-resource'
import * as VueGoogleMaps from "vue2-google-maps" // Import package

//import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/dist/antd.css'
//关闭Vue的生产提示
Vue.config.productionTip = false
//使用插件
Vue.use(vueResource)
Vue.use(Antd)
Vue.use(VueGoogleMaps, {
	load: {
	  key: "AIzaSyAarhLcO0N0o-bYIKddM-evmCkJNt1HxJo",
	  libraries: "places"
	}
  });


//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
})


