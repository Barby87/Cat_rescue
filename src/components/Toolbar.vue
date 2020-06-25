<template>
    <v-layout>
        <v-app-bar app color="indigo darken-4" dark>
    
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Cat Rescue</v-toolbar-title>

          <v-spacer></v-spacer>
    
          <v-tab to="/">Home</v-tab>
          <v-tab to="/login">Ingresar</v-tab>
          <v-btn outlined color="white" to="/signup">Crear cuenta</v-btn>       
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
  export default {
    name: 'Toolbar',

    data() {
      return {
        drawer: true
      }
     
    }
  }
</script>
