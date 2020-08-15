import Chart from '@/components/Chart';
import moment from 'moment';
import Arrow from '@/assets/down-arrow.svg';

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
    Arrow,
  },

  data() {
    return {
      isBodyVisible: false,
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
