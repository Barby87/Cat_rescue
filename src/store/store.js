import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Obteniendo el valor de localStorage cn getItem, si es que existe localStorage del usuario, de lo contrario retorna un objeto vacío.
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  getters: {
    sendingUser(state) {
      return state.user;
    }
  },
  mutations: {
    updateUser(state, dataUser) {
      // Se genera un item ('user' en local storage con el método setItem, a la cual se le pasará los datos que se recibieron del action, en formato JSON.
      localStorage.setItem('user', JSON.stringify(dataUser));
      // Mutando la información del usuario con los datos recibidos del action.
      state.user = dataUser;
    }
  },
  actions: {
    // Action disparada por registro y login.
    signUpUser(context, dataUser) {
      context.commit('updateUser', dataUser);
    }
  }
});
