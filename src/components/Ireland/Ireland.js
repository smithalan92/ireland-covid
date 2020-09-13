import { mapGetters, mapState } from 'vuex';
import ChartSection from '@/components/ChartSection';

export default {
  name: 'Ireland',

  components: {
    ChartSection,
  },

  computed: {
    ...mapGetters({
      allRecords: 'getAllIrishData',
    }),

    ...mapState([
      'totalIrishCases',
      'totalIrishDeaths',
      'totalIrishCasesInPast30Days',
      'changeInIrishCases',
      'changeInIrishDeaths',
      'latestIrishDataDateTime',
      'orderedIrishData',
    ]),
  },
};
