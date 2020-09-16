import Chart from '@/components/Chart';
import Card from '@/components/Card';
import Caret from '@/assets/caret.svg';
import moment from 'moment';

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
      return this.records.map((r) => `${moment(r.date).format('Do MMM')}`);
    },

    data() {
      return this.records.map((r) => r.newCases);
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
