import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    theme: {
        defaultTheme: 'light'
    },
    defaults: {
        VCard: {
            VBtn: { variant: 'outlined' },
        },
    },
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
