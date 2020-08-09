import { Chart } from 'highcharts-vue';

export default {
  name: 'Chart',

  props: {
    categories: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },

    seriesName: {
      type: String,
      required: false,
      default: '',
    },
  },

  components: {
    Highchart: Chart,
  },

  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'line',
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: this.categories,
        },
        yAxis: {
          title: {
            text: 'Number of new cases',
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: true,
          },
        },
        series: [{
          name: this.seriesName,
          data: this.data,
        }],
      };
    },
  },
};
