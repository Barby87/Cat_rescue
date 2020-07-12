import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import { db } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Obteniendo el valor de localStorage cn getItem, si es que existe localStorage del usuario, de lo contrario retorna un objeto vacío.
    user: JSON.parse(localStorage.getItem('user')) || {},
    postList: []
  },

  getters: {
    sendingUser(state) {
      return state.user;
    },

    sendingPosts(state) {
      return state.postList;
    }
  },

  mutations: {
    updateUser(state, dataUser) {
      // Se genera un item ('user' en local storage con el método setItem, a la cual se le pasará los datos que se recibieron del action, en formato JSON.
      localStorage.setItem('user', JSON.stringify(dataUser));
      // Mutando la información del usuario con los datos recibidos del action.
      state.user = dataUser;
    },
    
    // LEER
    readPostDBMutation(state) {
      // Recibiendo el post desde la base de datos con el método onSnapshot para que lo haga de manera instantánea
      db.collection('posts').doc('user').collection('added_posts').onSnapshot((response) => {
        // Variable auxiliar donde se guardarán los datos
        let aux = [];
        response.forEach(element => {
          aux.push({
            // id del documento en la db
            idDoc: element.id,
            title: element.data().title,
            location: element.data().location,
            description: element.data().description,
          });
        });
        state.postList = aux;
      });
    }
  },

  actions: {
    // Action disparada por registro y login.
    signUpUser(context, dataUser) {
      context.commit('updateUser', dataUser);
    },

    // Action para CREAR post directamente en la db
    // Cada vez que el usuario agregue un curso se generará un nuevo documento en la coleción added_posts, cada documento con id distinto
    createPost(context, dataPost) {
      db.collection('posts').doc('user').collection('added_posts').add({
        title: dataPost.title,
        location: dataPost.location,
        description: dataPost.description,
        // imagePost: dataPost.imagePost
      }).then(() => {
        Swal.fire(
          'Muy bien!',
          'Curso agregado',
          'success'
        );
      }).catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error con la base de datos',
          footer: '<b>Cat Rescue</b>'
        });
      });      
    },

    // LEER
    readPostDB(context) {
      context.commit('readPostDBMutation');
    }
  }
});
