import Vue from 'vue';
import Vuetify from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

import lv from 'vuetify/src/locale/lv'
import en from 'vuetify/src/locale/en'
import lt from 'vuetify/src/locale/lt'

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    locales: { lv, en, lt },
    current: 'lv'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#ff6600', // Logo orange
        secondary: '#333333', // Logo grey
        accent: '#336699', // Secondary color bluish
        error: '#993366', // Secondary color cyan
        warning: '#ffc107',
        info: '#006666', // Secondary green
        success: '#8bc34a'
      }
    }
  }
})
