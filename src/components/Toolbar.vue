<template>
    <v-layout>
        <v-app-bar app color="indigo darken-4" dark>
    
          <v-app-bar-nav-icon @click="drawer=!drawer" v-if="userName.uid"></v-app-bar-nav-icon>

          <v-toolbar-title>Cat Rescue</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <p>Hola {{user}}</p> -->
          <v-spacer></v-spacer>
          <v-tab to="/">Home</v-tab>
          <v-tab to="/login">Ingresar</v-tab>
          <v-btn outlined color="white" to="/signup">Crear cuenta</v-btn>
          <v-btn outlined color="white" @click="logOutUser">Salir</v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" temporary color="light-blue" v-if="userName.uid"> 
          <v-layout mt-4 column align-center>
            <v-flex>
              <v-avatar v-if="userName.photoURL">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-avatar>

              <v-avatar color="indigo" v-else>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex>
              <p class="white--text headline">{{userName.displayName}}</p>
            </v-flex>
          </v-layout>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Toolbar',
  // props: ['user'],
  data() {
    return {
      drawer: true
    }
  },

  computed: {
    userName() {
      return this.$store.getters.sendingUser;
    }
  },

  methods: {
    logOutUser() {
      firebase.auth().signOut().then(()=> {
        // Limpiando datos del usuario del estadouser = '';
        let dataUser = {
          displayName: '',
          email: '',
          emailVerified: '',
          uid: ''
        };

        this.$store.dispatch('signUpUser', dataUser);
        this.$router.push('/login');
        console.log('saliendo...');
      })
    }
  }
}
</script>
