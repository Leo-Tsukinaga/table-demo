import { createApp } from 'vue'
import './assets/css/bootstrap.css'
import './style.css'
import App from './App.vue'

import axios from 'axios'

const app = createApp(App);

axios.defaults.baseURL = 'https://www.escook.cn'

app.config.globalProperties.$http = axios;

app.mount('#app')
