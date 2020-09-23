import { h, computed } from 'vue';
import VueHighcharts from 'vue3-highcharts';

import './Chart.scss';

export default {
  name: 'Chart',

  components: {
    VueHighcharts,
  },

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

  setup(props) {
    const chartOptions = computed(() => ({
      chart: {
        type: 'line',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: props.categories,
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
        name: props.seriesName,
        data: props.data,
      }],
    }));

    return () => h(VueHighcharts, { options: chartOptions });
  },
};
