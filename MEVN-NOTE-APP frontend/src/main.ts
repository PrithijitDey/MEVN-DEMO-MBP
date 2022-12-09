import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vue3Material from 'vue3-material'
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import DownloadIcon from 'vue-material-design-icons/Download.vue';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})
createApp(App).use(store).use(router).use(Vue3Material).use(vuetify).component('delete-icon', DeleteIcon).component('download-icon', DownloadIcon).mount('#app')
