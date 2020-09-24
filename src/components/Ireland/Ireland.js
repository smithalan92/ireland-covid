import { mapState } from 'vuex';
import ChartSection from '@/components/ChartSection';
import Card from '@/components/Card';

export default {
  name: 'Ireland',

  components: {
    ChartSection,
    Card,
  },

  computed: {
    ...mapState([
      'allIrishData',
      'totalIrishCases',
      'totalIrishDeaths',
      'totalIrishCasesInPast30Days',
      'changeInIrishCases',
      'changeInIrishDeaths',
      'latestIrishDataDateTime',
      'orderedIrishData',
      'pastThreeMonthIrishData',
    ]),
  },
};
