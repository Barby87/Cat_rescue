<template>
  <div>
    <v-flex class="background py-18">
      <v-card width="500" color="rgb(255, 255, 255, 0.80)" class="mx-auto mt-5 pb-3">
        <v-toolbar dark color="indigo" class="pl-4">
          <v-toolbar-title>Ingresa tu usuario y clave</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <!-- E-mail -->
          <v-form class="pt-3">
            <v-text-field v-model="email" label="E-mail" prepend-icon="mdi-account-circle" color="teal darken-1"/>

          <!-- Contraseña -->
            <v-text-field v-model="password" label="Contraseña" color="teal darken-1" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
          </v-form>

          <!-- Botones -->
          <v-card-actions class="justify-center">
            <v-btn class="ma-2" tile color="blue darken-2" x-large dark @click="loginUser">Iniciar sesión</v-btn>
          </v-card-actions>

          <v-card-actions class="justify-center">
            <!-- <a @click="restablecer" href="#">Olvidé mi contraseña</a> -->
            <v-btn text color="primary" @click="restorePassword">Olvidé mi contraseña</v-btn>
          </v-card-actions>
        </v-card-text>

        <p align="center" class="text-lg-h6">
          ¿Aún no tienes una cuenta?
          <a href="/login">Regístrate aquí</a>
        </p>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import firebase from 'firebase';
import Swal from 'sweetalert2';
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      showPassword: false
    }
  },

  methods: {
    loginUser() {
      if(this.password && this.email) {
        // Método de autentificación con email y pass
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((response)=>{
        // Inicio de sesión exitosa
        console.log(response);	

        // Se crea un objeto con los datos del usuario que retorna la promesa
        let dataUser = {
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
          email: response.user.email,
          emailVerified: response.user.emailVerified,
          uid: response.user.uid
        };

        // Limpiando campos de correo y contraseña
        this.email = null;
        this.password = null;

        // Activando la action signUpUser y enviando el objeto dataUser
        this.$store.dispatch('signUpUser', dataUser);
        
        // Redireccionando a la página de inicio
        this.$router.push('/');

        }).catch(err => {
          console.error(err);
          if(err.code == 'auth/user-not-found') {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Este correo no está registrado en nuestra base de datos',
              footer: '<b>Cat Rescue</b>'
            }); 
          } else if(err.code == 'auth/wrong-password') {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'La contraseña es incorrecta',
              footer: '<b>Cat Rescue</b>'
            });
          } else if(err.code == 'auth/invalid-email') {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Formato de correo incorrecto',
              footer: '<b>Cat Rescue</b>'
            });
          } else {
            console.log(err.message);
          }
        });
      } else {
        Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Debe ingresar usuario y contraseña para iniciar sesión',
              footer: '<b>Cat Rescue</b>'
        });
      }
    },
  
    restorePassword() {     
      if(this.email){
        firebase.auth().sendPasswordResetEmail(this.email).then(function() {
        console.log("Enviado");
        }).catch(function(error) {
          // Ocurrió un error
          console.error(error);
          if(error.code == 'auth/user-not-found') {
            alert('Este correo no existe en nuestra base de datos');
          }
        });
      } else {
        alert('Para recuperar contraseña debe ingresar un correo válido');
      }
      
    }
  }
}
</script> 
<style scoped>
.background{
  background-image: url(../assets/gato1.jpg);
  margin: 0 auto;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
  
</style>
