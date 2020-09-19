import { h, computed, ref, onMounted, watch, onUnmounted } from 'vue';
import Highcharts from 'highcharts';

import './Chart.scss';

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

    const chartRef = ref(null);

    const chart = ref(null);

    onMounted(() => {
      chart.value = Highcharts.chart(chartRef.value, chartOptions.value);
    });

    watch(chartOptions, () => {
      if (chart.value) {
        chart.value.update(chartOptions.value, true, true, true);
      }
    });

    onUnmounted(() => {
      if (chart.value) chart.value.destroy();
    });

    return () => h('div', {
      class: 'chart',
      ref: chartRef,
    });
  },
};
