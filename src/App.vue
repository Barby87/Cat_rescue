<template>
  <div id="app">
    <v-app>
      <Toolbar></Toolbar>

      <v-main>
        <!-- Pasando la variable 'user' como props a Home -->
        <!-- Recibiendo evento exitUser -->
        <router-view :user="user" @exitUser="logOut"/>
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
    logOut() {
      firebase.auth().signOut().then(()=> {
        // this.$router.push('/login');
        this.user = '';
        this.emailUser = '';
        this.uid = '';
        this.$router.push('/login');
      })
    }
  },

};
</script>
