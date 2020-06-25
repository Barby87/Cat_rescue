import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
// Importando la librería de Firebase
import firebase from 'firebase';
// Importando el módulo de configuración de Firebase
import {firebaseConfig} from './config/firebaseConfig';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Uso de base de datos
export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
