import Vue from 'vue'
import App from './App'

//引入element-ui
import ElementUI from 'element-ui'
//引入elementui样式
import 'element-ui/lib/theme-chalk/index.css'


//使用elementui
Vue.use(ElementUI)

Vue.config.productionTip = false


new Vue({
  el:'#app',
	render: h => h(App),
	// store,
	//全局事件总线
	beforeCreate() {
		Vue.prototype.$bus = this
	}
})


