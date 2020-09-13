import Vue from 'vue';
import VueRouter from 'vue-router';
import Cork from '@/components/Cork';
import Ireland from '@/components/Ireland';

Vue.use(VueRouter);

const routes = [
  {
    name: 'root',
    path: '/',
    redirect: '/cork',
  },
  {
    name: 'cork',
    path: '/cork',
    component: Cork,
  },
  {
    path: '/ireland',
    name: 'ireland',
    component: Ireland,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

export default router;
