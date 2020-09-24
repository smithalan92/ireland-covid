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
    type: {
      type: String,
      required: false,
      default: 'chart',
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

    data() {
      if (this.type === 'chart') {
        return this.records.map((r) => r.newCases);
      }

      return this.records.map((r) => ([
        new Date(r.date).getTime(),
        r.newCases,
      ]));
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
