import { mapState } from 'vuex';
import ChartSection from '@/components/ChartSection';
import Card from '@/components/Card';

export default {
  name: 'Cork',

  components: {
    ChartSection,
    Card,
  },

  computed: {
    ...mapState([
      'allCorkData',
      'totalCorkCases',
      'totalCorkCasesInPast30Days',
      'latestCorkDataDateTime',
      'orderedCorkData',
    ]),

    newCorkCases() {
      return this.allCorkData[this.allCorkData.length - 1].newCases;
    },
  },
};
