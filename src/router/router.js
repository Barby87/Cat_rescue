import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    alias: ['/inicio', '/home']
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    alias: ['/iniciar-sesion', '/iniciar', '/login']
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    alias: ['/registro', '/registrar', '/crear-usuario', '/nuevo-usuario']
  },
  {
    path: '*',
    redirect: '/login'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
