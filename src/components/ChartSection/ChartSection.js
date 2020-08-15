import Chart from '@/components/Chart';
import moment from 'moment';
import { mdiChevronDown } from '@mdi/js';

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
  },

  components: {
    Chart,
  },

  data() {
    return {
      isBodyVisible: false,
      mdiChevronDown,
    };
  },

  computed: {
    categories() {
      return this.records.map((r) => `${moment(r.date).format('Do MMM')}`);
    },

    data() {
      return this.records.map((r) => r.casesSincePrevious);
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
