import { mapState } from 'vuex';
import Highcharts from 'highcharts';
import highchartsDarkTheme from 'highcharts/themes/high-contrast-dark';
import Tabs from '@/components/Tabs';
import StockCharts from 'highcharts/modules/stock';

const SMALL_WINDOW_BREAKPOINT = 900;
const TINY_WINDOW_BREAKPOINT = 555;

export default {
  name: 'App',

  components: {
    Tabs,
  },

  data() {
    return {
      isSmallWindow: false,
      isTinyWindow: false,
    };
  },

  computed: {
    ...mapState([
      'lastDataUpdateDateTime',
    ]),

    appClassesToApply() {
      const classes = ['app'];

      if (this.isTinyWindow) {
        classes.push('app--tiny');
      } else if (this.isSmallWindow) {
        classes.push('app--small');
      }

      return classes;
    },
  },

  methods: {
    selectTab(tab) {
      this.$router.push({ name: tab.route });
    },

    onWindowResize() {
      this.isSmallWindow = window.innerWidth <= SMALL_WINDOW_BREAKPOINT;
      this.isTinyWindow = window.innerWidth <= TINY_WINDOW_BREAKPOINT;
    },
  },

  created() {
    highchartsDarkTheme(Highcharts);
    StockCharts(Highcharts);
    this.$store.dispatch('processData');

    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize());
  },
};
