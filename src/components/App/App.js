import Highcharts from 'highcharts';
import highchartsDarkTheme from 'highcharts/themes/high-contrast-dark';
import Tabs from '@/components/Tabs';

export default {
  name: 'App',

  components: {
    Tabs,
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
