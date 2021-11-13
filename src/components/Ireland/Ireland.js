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
      'totalIrishDeathsInPast30Days',
      'totalIrishCasesInPast14Days',
      'totalIrishDeathsInPast14Days',
      'changeInIrishCases',
      'changeInIrishDeaths',
      'latestIrishDataDateTime',
      'orderedIrishData',
      'totalPeopleVaccinated',
      'percentagePeopleFullyVaccinated',
      'peopleInICU',
      'peopleInHospital',
    ]),

    allIrishCases() {
      return this.allIrishData.map(({ newCases, date }) => ({ newCases, date }));
    },

    allIrishDeaths() {
      return this.allIrishData.map(({ newDeaths, date }) => ({ newDeaths, date }));
    },
  },
};
