import { ref, computed, onMounted, nextTick } from 'vue';
import Chart from '@/components/Chart';
import Card from '@/components/Card';
import Caret from '@/assets/caret.svg';
import moment from 'moment';
import { cloneDeep } from 'lodash';

export default {
  name: 'HospitalChart',

  props: {
    records: {
      type: Array,
      required: true,
    },
    forceInitalExpand: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    Chart,
    Card,
    Caret,
  },

  setup(props) {
    const containerEl = ref(null);
    const isBodyVisible = ref(false);

    const recordsOrderedAsc = computed(() => cloneDeep(props.records).sort((a, b) => new Date(a.date) - new Date(b.date)));

    const categories = computed(() => recordsOrderedAsc.value.map((r) => `${moment(r.date).format('Do MMM')}`));

    const series = computed(() => {
      const icuCases = [];
      const hospitalCases = [];

      recordsOrderedAsc.value
        .forEach(({ peopleInICU, peopleInHospital }) => {
          icuCases.push(peopleInICU);
          hospitalCases.push(peopleInHospital);
        });

      return [
        { name: 'People in ICU', data: icuCases },
        { name: 'People in Hospital', data: hospitalCases },
      ];
    });

    const onClickToggle = async () => {
      isBodyVisible.value = !isBodyVisible.value;
      if (isBodyVisible.value && containerEl.value) {
        await nextTick();
        containerEl.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    onMounted(() => {
      if (props.forceInitalExpand) isBodyVisible.value = true;
    });

    return {
      containerEl,
      isBodyVisible,
      categories,
      series,
      onClickToggle,
    };
  },
};
