<template>
  <v-container>
    <v-alert dense text type="success" v-if="userName.uid">Conexión exitosa</v-alert>

    <v-alert dense outlined type="error" v-else>No hay usuario conectado</v-alert>

    <h1 class="d-inline-block">Bienvenido</h1>
    
    <!-- Card formulario post -->
    <v-card shaped>
      <v-container>
        <v-flex>   
          <!-- Formulario publicacion -->
          <v-form>
            <v-container>
              <v-row>
                <!-- Foto de perfil -->
                <v-col>
                  <v-avatar v-if="userName.photoURL">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-avatar>
                  
                  <v-avatar color="indigo" v-else>
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
              </v-row>

              <v-row>
                <!-- Título -->
                <v-col cols="12" sm="6">
                  <v-text-field v-model="title" label="Título" color="success" filled dense></v-text-field>
                </v-col>

                <!-- Ubicación -->
                <v-col cols="12" sm="6">
                  <v-text-field v-model="location" label="Ubicación" prepend-icon="mdi-map-marker" color="success" filled dense></v-text-field>
                </v-col>
              </v-row>
              
              <!-- Descripción -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-textarea v-model="description" filled auto-grow label="Descripción" rows="2" row-height="20" color="success" dense></v-textarea>
                </v-col>

                <!-- Imagen post -->
                <!-- <v-col cols="12" sm="6">
                  <v-file-input @change="onFileSelected" label="Subir imagen" filled prepend-icon="mdi-camera" color="success" dense></v-file-input>
                </v-col> -->
              </v-row>
              
              <!-- Botón publicar -->
              <v-card-actions class="d-flex justify-end">
                <v-btn color="red" text @click="onReset">Reset</v-btn>
                <v-btn color="deep-purple lighten-2" text @click="toPost">PUBLICAR</v-btn>

              </v-card-actions>
            </v-container>
          </v-form>
        </v-flex>
      </v-container>
    </v-card>  

    <!-- Card Post -->
    <v-container d-flex justify-space-between align-center flex-wrap my-5 py-5> 
     <v-row>
        <v-col v-for="(post, index) in posts" :key="index">
          <v-card max-width="344" class="mx-auto my-5">
            <v-list-item d-flex justify-space-between>
              <!-- <v-list-item-avatar color="grey"></v-list-item-avatar> -->
              <v-avatar v-if="userName.photoURL">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-avatar>
                  
              <v-avatar color="indigo" v-else>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>

              <v-list-item-content class="ml-5">
                <v-list-item-title class="headline">{{post.title}}</v-list-item-title>
                <v-list-item-subtitle><v-icon>mdi-map-marker</v-icon>{{post.location}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          
            <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>
          
            <v-card-text>
              {{post.description}}
            </v-card-text>
          
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">Read</v-btn>
              <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
              <v-spacer></v-spacer>
              <!-- Botón Me gusta -->
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <!-- Botón Guardar -->
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <!-- Botón compartir -->
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card> 
        </v-col>   
     </v-row>
    </v-container>          
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: 'Home',
  data() {
    return { 
      title: '',
      location: '',
      description: '',
      // Imagen de post
      // selectedFile: null,
      // uploadValue: 0,
      // picture: null
    }
  },
  computed: {
    userName() {
      return this.$store.getters.sendingUser;
    },

    posts() {
      return this.$store.getters.sendingPosts;
    }
  },

  methods: {
    // Subir Imagen
    // onFileSelected(event) {
    //   this.selectedFile = event.target.files[0];
    //   console.log(event);
    // },

    // CREACION DE POST
    toPost() {
      // Iniciando variable con los datos que serán a la action
      let dataPost = {
        title: this.title,
        location: this.location,
        description: this.description
        // image: this.imgPost
      }

      if(this.title && this.description && this.location){
        //Enviar dataPost a action 
        this.$store.dispatch('createPost', dataPost);
        // Limpiar campos
        this.title = '',
        this.location = '',
        this.description = ''
        // this.imgPost = null
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese los datos solicitados',
            footer: '<b>Cat Rescue</b>'
        });
      }  
    },

    onReset() {
        this.title = '',
        this.location = '',
        this.description = ''
        // this.imgPost = null
    }
  },

  mounted() {
    // Llamado a la action readPostDB
    this.$store.dispatch('readPostDB');
  }
}
</script>
