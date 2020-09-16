import Vue from 'vue';
import App from '@/components/App';
import store from '@/store';
import router from '@/router';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render(h) { return h(App); },
}).$mount('#app');
