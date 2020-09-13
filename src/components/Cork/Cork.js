import { mapGetters, mapState } from 'vuex';
import ChartSection from '@/components/ChartSection';

export default {
  name: 'Cork',

  components: {
    ChartSection,
  },

  computed: {
    ...mapGetters({
      allRecords: 'getAllCorkData',
    }),

    ...mapState([
      'totalCorkCases',
      'totalCorkCasesInPast30Days',
      'latestCorkDataDateTime',
      'orderedCorkData',
    ]),
  },
};
