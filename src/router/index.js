import { createRouter, createWebHistory } from 'vue-router';
import Cork from '@/components/Cork';
import Ireland from '@/components/Ireland';
import CountyBreakdown from '@/components/CountyBreakdown';

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
  {
    path: '/counties',
    name: 'counties',
    component: CountyBreakdown,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
