import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCSI41Y8OeLkJ2zX-9SwNfbVDsLZeSHMKE",
  authDomain: "shine-b13ef.firebaseapp.com",
  databaseURL: "https://shine-b13ef.firebaseio.com",
  projectId: "shine-b13ef",
  storageBucket: "",
  messagingSenderId: "777337715597",
  appId: "1:777337715597:web:9ea1355cb5804231",
};
firebase.initializeApp(firebaseConfig)
Vue.config.productionTip = false
Vue.use(firebase)
firebase.messaging().usePublicVapidKey("BAoVG6-wmCYUJtu1-sfS6x9DZmiUAmRDF3lVNQNY4SZgpf54YuO8jTJoErgL_rviLShCRUCWkkONCmRFxWXNNuI")

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
