/* eslint-disable no-param-reassign */
import { mdiLoading } from '@mdi/js';
import Highcharts from 'highcharts';
import highchartsDarkTheme from 'highcharts/themes/high-contrast-dark';
import Tabs from '@/components/Tabs';

export default {
  name: 'App',

  components: {
    Tabs,
  },

  data() {
    return {
      mdiLoading,
    };
  },

  methods: {
    selectTab(tab) {
      this.$router.push({ name: tab });
    },
  },

  created() {
    highchartsDarkTheme(Highcharts);
    this.$store.dispatch('processData');
  },
};
