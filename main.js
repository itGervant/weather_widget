
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faBars, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faGear, faBars, faTrash, faXmark)
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
const div = document.createElement('weather-widget')
document.body.appendChild(div)
app.mount(div);

