/* eslint-disable no-param-reassign */
import ChartSection from '@/components/ChartSection';
import moment from 'moment';
import { groupBy } from 'lodash';
import { mdiLoading } from '@mdi/js';
import caseData from '../../data.json';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default {
  name: 'App',

  components: {
    ChartSection,
  },

  data() {
    return {
      orderedData: [],
      totalIrishCases: caseData.totalIrishCases,
      totalIrishDeaths: caseData.totalIrishDeaths,
      latestIrishDataDateTime: moment(caseData.latestIrishDataDateTime).format('Do MMMM'),
      latestCorkDataDateTime: moment(caseData.latestCorkDataDateTime).format('Do MMMM'),
      totalCorkCases: 0,
      totalCorkCasesInPast30Days: 0,
      isFinishedLoading: false,
      mdiLoading,
    };
  },

  computed: {
    allRecords() {
      return this.orderedData
        .map((y) => y.data)
        .flat()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },

  methods: {
    async parseData() {
      this.totalIrishCases = caseData.totalIrishCases;
      this.totalIrishDeaths = caseData.totalIrishDeaths;
      this.latestIrishDataDateTime = moment(caseData.latestIrishDataDateTime).format('Do MMMM YYYY');
      this.latestCorkDataDateTime = moment(caseData.latestCorkDataDateTime).format('Do MMMM YYYY');
      this.totalCorkCases = caseData.totalCasesInCork;
      this.totalCorkCasesInPast30Days = caseData.totalCorkCasesInPast30Days;

      // Group the data nicely by months in reverse
      const groupedData = groupBy(caseData.corkData, (r) => moment(r.date).format('MMMM'));

      MONTHS.reverse().forEach((month) => {
        if (groupedData[month]) {
          this.orderedData.push({
            month,
            data: groupedData[month].sort((a, b) => new Date(a) - new Date(b)),
          });
        }
      });

      this.isFinishedLoading = true;
    },
  },

  mounted() {
    this.isFinishedLoading = false;
    this.parseData();
    this.isFinishedLoading = true;
  },
};
