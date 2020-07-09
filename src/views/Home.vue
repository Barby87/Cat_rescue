<template>
  <v-container>
    <h1 class="d-inline-block">Bienvenido </h1>

    <v-alert dense text type="success" v-if="userName.uid">Conexión exitosa</v-alert>

    <v-alert dense outlined type="error" v-else>No hay usuario conectado</v-alert>
    
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    userName() {
      return this.$store.getters.sendingUser;
    }
  },
}
</script>
