import Vue from 'vue';
import Vuetify, {
  VAlert,
  VApp,
  VCard,
  VToolbar,
  VDialog,
  VFileInput,
  VRow,
  VCol,
  
} from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify,{
  components: {
    VAlert,
    VApp,
    VCard,
    VToolbar,
    VDialog,
    VFileInput,
    VRow,
    VCol
  },
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2196f3',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
