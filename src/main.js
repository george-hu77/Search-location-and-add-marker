
import Vue from 'vue'
//import { createApp } from 'vue';
import Antd from 'ant-design-vue'

import App from './App.vue'

import vueResource from 'vue-resource'
import * as VueGoogleMaps from "vue2-google-maps" // Import package

//import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(vueResource)
Vue.use(Antd)
Vue.use(VueGoogleMaps, {
	load: {
	  key: "AIzaSyAarhLcO0N0o-bYIKddM-evmCkJNt1HxJo",
	  libraries: "places"
	}
  });



new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
})


