<template>
    <v-card color="grey lighten-4" flat tile>
        <v-toolbar color="teal" dark>
          <v-container>
          <v-toolbar-title>Cat Rescue</v-toolbar-title>
          <v-spacer></v-spacer> 
          <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn> -->
          <v-toolbar-items class="hidden-sm-and-down">
            <v-tab to="/">HOME</v-tab>
            <v-tab to="/login">LOGIN</v-tab>
            <v-tab to="/signup">REGISTRO</v-tab>
          </v-toolbar-items>
          </v-container>
        </v-toolbar>
    </v-card>
</template>

<script>
  export default {
    name: 'Toolbar',

    data: () => ({
     
    })
  }
</script>
