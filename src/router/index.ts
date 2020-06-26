import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'DeckSelection',
    component: () => import('../views/Home.vue'),
    props: true,
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/Learn.vue'),
    props: true,
  },
  {
    path: '/add',
    name: 'Add New Deck',
    component: () => import('../views/AddNewDeck.vue'),
    props: true,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
