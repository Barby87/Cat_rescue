<template>
  <v-container>
    <!-- <div v-if="user"> -->
      <!-- <h3>Hola {{user}}</h3> -->
      <!-- <a href="#" @click="exitUser">Cerrar sesión</a> -->
    <!-- </div> -->
    
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  props: ['user'],
  methods: {
    exitUser() {
      // Enviando evento 'exitUser' a App.vue para cerrar sesión
      this.$emit('exitUser');
    }
  }
}
</script>
