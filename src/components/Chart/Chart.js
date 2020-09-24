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

    type: {
      type: String,
      required: true,
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
        opposite: false,
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

    return () => h(VueHighcharts, {
      options: chartOptions,
      type: props.type,
    });
  },
};
