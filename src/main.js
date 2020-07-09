import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/store.js';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
// Importando la librería de Firebase
import firebase from 'firebase';
// Importando el módulo de configuración de Firebase
import {firebaseConfig} from './config/firebaseConfig';

Vue.use(Vuelidate);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Uso de base de datos
export const db = firebase.firestore();


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
