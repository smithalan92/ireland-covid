import Vue from 'vue';
import App from '@/components/App';
import store from '@/store';
import router from '@/router';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render(h) { return h(App); },
}).$mount('#app');
