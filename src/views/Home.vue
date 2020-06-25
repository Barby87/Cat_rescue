<template>
  <v-container>
    <div v-if="user">
      <h3>Bienvenido {{user}}</h3>
      <a href="#" @click="exitUser">Cerrar sesión</a>
    </div>
  
    <v-layout wrap>
      <!-- row -->
      <v-flex class="primary" xs6 md2 >
        <h1>12</h1>
      </v-flex>
      <v-flex class="secondary" xs6>
        <h1>6</h1>
      </v-flex>
       <v-flex class="error" xs6>
        <h1>6</h1>
      </v-flex>
    </v-layout>
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
