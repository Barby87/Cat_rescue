<template>
  <v-app>
    <Toolbar/>

    <v-content>
      <router-view/>
    </v-content>

  <Footer fluid/>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
    Footer
  }
};
</script>
