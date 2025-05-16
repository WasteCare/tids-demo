import './assets/main.css'

import { createApp } from 'vue'
import FilteredInboxView from './views/FilteredInboxView.vue'
import router from './router'
import { pinia } from './plugins/pinia'

const app = createApp(FilteredInboxView)

app.use(router)
app.use(pinia)

app.mount('#app')

document.documentElement.classList.add('h-full')
document.body.classList.add('h-full')
