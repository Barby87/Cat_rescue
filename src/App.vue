<template>
  <div id="app">
    <v-app>
      <Toolbar :user="user"></Toolbar>
       <!--  @exitUser="logOut" -->

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
      user: '',
      emailUser: '',
      uid: ''
    }
  },
  methods: {
    // Método 
    // logOut() {
    //   firebase.auth().signOut().then(()=> {
    //     // this.$router.push('/login');
    //     this.user = '';
    //     this.emailUser = '';
    //     this.uid = '';
    //     this.$router.push('/login');
    //   })
    // },
    // Método para detectar si hay algún cambio en el estado del usuario que está autentificado, una vez que haya sido montado el componente
    beforeUpdate() {
      firebase.auth().onAuthStateChanged(dato => {
        if(dato) {
          console.log(dato.data);
          this.user = dato.displayName;
          this.email = dato.email;
          this.uid = dato.uid;

          console.log(dato.emailVerified);
          if(!dato.emailVerified) {
              dato.sendEmailVerification().then(function() {
              console.log('Correo enviado');
              console.log(dato.emailVerified);
            }).catch(function(error) {
              console.log(error);
            });
          }
        } else {
          this.user = '';
        }
      })
    }
  }
};
</script>
