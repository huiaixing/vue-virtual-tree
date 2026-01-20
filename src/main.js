import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
// 验证 引入dist包
// import VueVirtualLazyTree from 'vue-virtual-lazy-tree';
// import 'vue-virtual-lazy-tree/dist/vue-virtual-lazy-tree.css';
const app = createApp(App)

app.use(ElementPlus)
// 全局注册
// app.use(VueVirtualLazyTree.install(app));
app.mount('#app')