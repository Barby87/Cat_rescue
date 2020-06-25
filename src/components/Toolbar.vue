<template>
    <v-layout>
        <v-app-bar app color="indigo darken-4" dark>
    
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Cat Rescue</v-toolbar-title>

          <v-spacer></v-spacer>

          <p>Hola {{user}}</p>
          <v-spacer></v-spacer>
          <v-tab to="/">Home</v-tab>
          <v-tab to="/login">Ingresar</v-tab>
          <v-btn outlined color="white" to="/signup">Crear cuenta</v-btn>
          <v-btn outlined color="white" @click="logOut" >Salir</v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" temporary color="light-blue"> 
          <v-layout mt-4 column align-center>
            <v-flex>
              <v-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Imagen de perfil">
              </v-avatar>
            </v-flex>
            <v-flex>
              <p class="white--text headline">Nombre Usuario</p>
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
      drawer: true,
      user: '',
      emailUser: '',
      uid: ''
    }
  },
  methods: {
    // exitUser() {
    //   // Enviando evento 'exitUser' a App.vue para cerrar sesión
    //   this.$emit('exitUser');
    // }
     logOut() {
      firebase.auth().signOut().then(()=> {
        this.user = '';
        this.emailUser = '';
        this.uid = '';
        this.$router.push('/login');
      })
    },
  }
}
</script>
