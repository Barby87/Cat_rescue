<template>
  <div id="app">
    <v-app>
      <Toolbar :userInfo="userInfo"></Toolbar>
       <!--@exitUser="logOut"-->

      <v-main>
        <!-- Pasando la variable 'user' como props a Home -->
        <!-- Recibiendo evento exitUser -->
        <router-view/>
      </v-main>

      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import Footer from '@/components/Footer.vue';
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    Toolbar,
    Footer
  },
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    // Método para detectar si hay algún cambio en el estado del usuario que está autentificado, una vez que haya sido montado el componente
    mounted() {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          console.log(user.data);
          this.user = user.displayName;
          this.email = user.email;
          this.uid = user.uid;

          this.userInfo = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid
          };

          console.log(user.emailVerified);
          // Recuperar contraseña
          if(!user.emailVerified) {
              user.sendEmailVerification().then(function() {
              console.log('Correo enviado');
              console.log(user.emailVerified);
            }).catch(function(error) {
              console.log(error);
            });
          }
        } else {
          this.userInfo = {
            displayName: '',
            email: '',
            emailVerified: '',
            uid: ''
          };
        }
      })
    }
  }
};
</script>
