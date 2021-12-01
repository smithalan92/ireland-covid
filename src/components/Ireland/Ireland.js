import { mapState } from 'vuex';
import ChartSection from '@/components/ChartSection';
import HospitalChart from '@/components/HospitalChart';
import Card from '@/components/Card';

export default {
  name: 'Ireland',

  components: {
    ChartSection,
    HospitalChart,
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
      'hospitalData',
    ]),

    allIrishCases() {
      return this.allIrishData.map(({ newCases, date }) => ({ newCases, date }));
    },

    allIrishDeaths() {
      return this.allIrishData.map(({ newDeaths, date }) => ({ newDeaths, date }));
    },

    latestHospitalData() {
      const [latestData] = this.hospitalData.sort((a, b) => new Date(b.date) - new Date(a.date));

      return latestData;
    },
  },
};
