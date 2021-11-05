import Chart from '@/components/Chart';
import Card from '@/components/Card';
import Caret from '@/assets/caret.svg';
import moment from 'moment';
import util from '@/util';

export default {
  name: 'ChartSection',

  props: {
    title: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
    forceInitalExpand: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'chart',
    },
    showTotalFigures: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    Chart,
    Card,
    Caret,
  },

  data() {
    return {
      isBodyVisible: false,
    };
  },

  computed: {
    categories() {
      if (this.type === 'chart') {
        return this.records.map((r) => `${moment(r.date).format('Do MMM')}`);
      }

      return [];
    },

    series() {
      const caseData = [];
      const deathData = [];

      if (this.type === 'chart') {
        this.records.forEach((r) => {
          caseData.push(r.newCases);

          if (r.newDeaths !== undefined) {
            deathData.push(r.newDeaths);
          }
        });
      } else {
        this.records.forEach((r) => {
          const timeStamp = new Date(r.date).getTime();

          caseData.push([timeStamp, r.newCases]);

          if (r.newDeaths !== undefined) {
            deathData.push([timeStamp, r.newDeaths]);
          }
        });
      }

      const series = [{
        name: 'Daily new cases',
        data: caseData,
      }];

      if (deathData.length) {
        series.push({
          name: 'Daily new deaths',
          data: deathData,
        });
      }

      return series;
    },

    totalFigures() {
      const results = this.records.reduce((acc, current) => {
        acc.cases += current.newCases;
        acc.deaths += current.newDeaths;
        return acc;
      }, { cases: 0, deaths: 0 });

      const deaths = util.formatNumber(results.deaths);

      return {
        cases: util.formatNumber(results.cases),
        // eslint-disable-next-line no-restricted-globals
        deaths: isNaN(deaths) ? 'Not available' : deaths,
      };
    },
  },

  methods: {
    async onClickToggle() {
      this.isBodyVisible = !this.isBodyVisible;
      if (this.isBodyVisible) {
        await this.$nextTick();
        this.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  },

  mounted() {
    if (this.forceInitalExpand) this.isBodyVisible = true;
  },
};
