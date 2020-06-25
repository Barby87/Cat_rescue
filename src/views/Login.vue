<template>
  <div>
    <v-flex>
      <v-card width="400" class="mx-auto mt-5">
        <v-toolbar dark color="indigo">
          <v-toolbar-title>Ingresa tu usuario y clave</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field label="Email" prepend-icon="mdi-account-circle"/>
            <v-text-field label="Contraseña" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn class="ma-2" tile color="blue darken-2" x-large dark>Iniciar sesión</v-btn>
        </v-card-actions>

        <v-card-actions class="justify-center">
          <!-- <a @click="restablecer" href="#">Olvidé mi contraseña</a> -->
          <v-btn text color="primary" @click="restablecer">Olvidé mi contraseña</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <br>
    <p align="center">
      ¿Aún no tienes una cuenta?
      <a href="/login">Regístrate aquí</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false
    }
  },
}
</script> 
