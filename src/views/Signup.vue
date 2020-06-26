<template>
  <v-flex class="background py-10">
    <v-card class="mx-auto pb-3" color="rgb(255, 255, 255, 0.85)" width="500"> 
      <v-toolbar dark color="indigo" class="pl-4"> 
        <v-toolbar-title>Completa tus datos</v-toolbar-title>
      </v-toolbar>
      <!-- <v-progress-linear v-if="apiRequest" :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4"
      ></v-progress-linear> -->
      <v-card-text>
        <form>
          <v-text-field v-model="name" :error-messages="nameErrors" :counter="20" label="Nombre" prepend-icon="mdi-account" required @input="$v.name.$touch()" @blur="$v.name.$touch()">
          </v-text-field>
        
          <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" prepend-icon="mdi-email" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        
          <v-text-field v-model="password" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" label="Contraseña" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
        
          <v-text-field v-model="confirmPassword" :error-messages="confirmPasswordErrors" @input="$v.confirmPassword.$touch()" @blur="$v.confirmPassword.$touch()" label="Confirmar contraseña" :type="showPassword ? 'text' : 'confirmPassword'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
        
          <v-checkbox v-model="userAgree" :error-messages="userAgreeErrors" label="Al registrarme, declaro que soy mayor de edad y acepto los Términos y condiciones y las Políticas de privacidad de Cat Rescue." required @change="$v.userAgree.$touch()" @blur="$v.userAgree.$touch()"></v-checkbox>
        </form>

        <v-card-actions class="justify-center">
          <v-btn class="ma-2" tile color="blue darken-2" x-large dark @click="signUpUser">CREAR CUENTA</v-btn>
          <v-btn class="ma-2" tile color="red darken-4" x-large dark @click="clear">RESETEAR</v-btn>
        </v-card-actions>
      </v-card-text>
      <p align="center" class="text-lg-h6">
        ¿Ya tienes una cuenta?
        <a href="/login">Inicia sesión aquí</a>
      </p> 
    </v-card>
  </v-flex>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, maxLength, email } from 'vuelidate/lib/validators';
  import firebase from 'firebase';

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(20) },
      email: { required, email },
      password: { required },
      confirmPassword: { required },
       userAgree: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      email: '',
      password: '',
      showPassword: '',
      confirmPassword: '',
      userAgree: false
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.maxLength && errors.push('El nombre debe tener como máximo 20 caracteres')
        !this.$v.name.required && errors.push('El nombre es obligatorio')
        return errors;
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Ingrese un correo válido')
        !this.$v.email.required && errors.push('El correo es obligatorio')
        return errors;
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required && errors.push('La contraseña es obligatoria')
        return errors;
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors;
        !this.$v.confirmPassword.required && errors.push('Por favor, confirme contraseña')
        return errors;
      },
      userAgreeErrors () {
        const errors = []
        if (!this.$v.userAgree.$dirty) return errors;
        !this.$v.userAgree.checked && errors.push('Antes de seguir debes aceptar los términos y condiciones')
        return errors;
      }
    },

    methods: {
      // submit () {
      //   this.$v.$touch()
      // },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.userAgree = false
      },
      signUpUser() {
        this.$v.$touch();
        // Lo ideal es hacer las validaciones del formulario antes de hacer el llamado a la base de datos
        if(this.name && this.email && this.password && this.confirmPassword && this.userAgree) {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(response => {
            console.log(response);
            console.log(response.user);
            // Pasando otra promesa a la respuesta, para que actualice el usuario
            return response.user.updateProfile({
              displayName: this.name,
            // Retorna promesa vacía, dentro de la cual indico que me redireccione a la raíz
            }).then(() => {
              this.name = '';
              this.email = '';
              this.password = '';
              // Usar guards de router para redirigir forzosamente a otra ruta
              this.$router.push('/');
            })
          }).catch(err => {
              if(err.code == 'auth/weak-password') {
                alert('La contraseña debe contener al menos 6 caracteres')
              } else if(err.code == 'auth/email-already-in-use') {
                alert('Este email ya está en uso, intente restablecer contraseña o registrarse con otro correo');
              } else {
                console.error(err);
              }
            })
        } else if(this.password === this.confirmPassword){
          alert("Las contraseñas deben ser iguales")
        } else {
          alert("Antes de continuar debe completar todos los datos")
        }
      }
    },
  }
</script>

<style scoped>

.background{
  background-image: url(../assets/gato-abrazo.jpg);
    margin: 0 auto;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

</style>