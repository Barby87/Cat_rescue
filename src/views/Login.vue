<template>
  <div>
    <v-flex class="background py-16">
      <v-card width="500" color="rgb(255, 255, 255, 0.80)" class="mx-auto mt-5 pb-3">
        <v-toolbar dark color="indigo" class="pl-4">
          <v-toolbar-title>Ingresa tu usuario y clave</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form class="pt-3">
            <v-text-field v-model="email" label="E-mail" prepend-icon="mdi-account-circle"/>
            <v-text-field v-model="password" label="Contraseña" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
          </v-form>

          <v-card-actions class="justify-center">
            <v-btn class="ma-2" tile color="blue darken-2" x-large dark @click="loginUser">Iniciar sesión</v-btn>
          </v-card-actions>

          <v-card-actions class="justify-center">
            <!-- <a @click="restablecer" href="#">Olvidé mi contraseña</a> -->
            <v-btn text color="primary" @click="restore">Olvidé mi contraseña</v-btn>
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
        // correo y clave deberían verificarse antes
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((datos)=>{
        // Inicio de sesión exitosa
        console.log(datos);	
        console.log(datos.user);
        console.log(datos.email);
        console.log(datos.uid);
        // Limpiando campos de correo y contraseña
        this.email = null;
        this.password = null;
        // Redireccionando a la página de inicio
        this.$router.push('/');

        }).catch(err => {
          console.error(err);
          if(err.code == 'auth/user-not-found') {
            alert('Este correo no está registrado en nuestra base de datos');
          } else if(err.code == 'auth/wrong-password') {
            alert('Su contraseña es incorrecta');
          } else if(err.code == 'auth/invalid-email') {
            alert('Formato de correo incorrecto');
          } else {
            console.log(err.message);
          }
        });
      } else {
        alert('Debe ingresar usuario y contraseña para iniciar sesión');
      }
    },

    restore() {     
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
  /* margin: 0 auto; */
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
  
</style>
