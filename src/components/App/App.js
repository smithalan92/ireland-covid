/* eslint-disable no-param-reassign */
import ChartSection from '@/components/ChartSection';
import api from '@/api';
import moment from 'moment';
import { groupBy } from 'lodash';
import { mdiLoading } from '@mdi/js';

const CACHE_KEY = 'v2';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default {
  name: 'App',

  components: {
    ChartSection,
  },

  data() {
    return {
      orderedData: [],
      totalIrishCases: 0,
      totalIrishDeaths: 0,
      lastRecordDate: null,
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

    totalCases() {
      if (!this.allRecords.length) return 0;

      if (this.allRecords.length === 1) return this.allRecords[0].totalConfirmedCovidCases;

      return this.allRecords[this.allRecords.length - 1].totalConfirmedCovidCases;
    },

    previous30DayCases() {
      return this.allRecords
        .slice(this.allRecords.length - 30, this.allRecords.length)
        // eslint-disable-next-line no-return-assign
        .reduce((acc, current) => acc += current.casesSincePrevious, 0);
    },
  },

  methods: {
    async loadCorkData() {
      let corkData = await api.getCorkCaseBreakdown();

      // We're getting bad timestamps back from the API. Need to filter out timestamps in the future
      corkData = corkData.filter(({ TimeStamp }) => !moment(TimeStamp).isAfter(moment(), 'day'));

      const latestTimestamp = corkData[corkData.length - 1].TimeStamp;
      const lastRecordDate = moment(latestTimestamp);

      this.lastRecordDate = lastRecordDate.format('Do MMMM YYYY');

      corkData = corkData.map(({ ConfirmedCovidCases, TimeStamp }, index) => {
        let casesSincePrevious = 0;

        if (index > 0) {
          const previousConfirmedCases = corkData[index - 1].ConfirmedCovidCases;
          const differenceSincePrevious = ConfirmedCovidCases - previousConfirmedCases;
          casesSincePrevious = differenceSincePrevious > 0 ? differenceSincePrevious : 0;
        }

        return {
          date: new Date(TimeStamp).toISOString(),
          count: ConfirmedCovidCases,
          casesSincePrevious,
          totalConfirmedCovidCases: ConfirmedCovidCases,
        };
      });

      // Group the data nicely by months in reverse
      const groupedData = groupBy(corkData, (r) => moment(r.date).format('MMMM'));

      MONTHS.reverse().forEach((month) => {
        if (groupedData[month]) {
          this.orderedData.push({
            month,
            data: groupedData[month].sort((a, b) => new Date(a) - new Date(b)),
          });
        }
      });

      return lastRecordDate;
    },

    async loadDataFromAPI() {
      const [lastRecordDate, totalIrishCases, totalIrishDeaths] = await Promise.all([
        this.loadCorkData(),
        api.getTotalIrishCases(),
        api.getTotalIrishDeaths(),
      ]);

      this.totalIrishCases = totalIrishCases;
      this.totalIrishDeaths = totalIrishDeaths;

      this.isFinishedLoading = true;

      this.saveDataToLocalStorage(lastRecordDate);
    },

    saveDataToLocalStorage(lastRecordDate) {
      const dataToSave = {
        lastRecordDate,
        corkData: this.orderedData,
        totalIrishCases: this.totalIrishCases,
        totalIrishDeaths: this.totalIrishDeaths,
      };
      localStorage.setItem(`cached-data-${CACHE_KEY}`, JSON.stringify(dataToSave));
    },
  },

  async created() {
    const savedData = JSON.parse(localStorage.getItem(`cached-data-${CACHE_KEY}`));

    // If today is the same date as the last record date, just use the cache
    if (savedData && moment(savedData.lastRecordDate).isSame(moment(), 'day')) {
      this.orderedData = savedData.data;
      this.lastRecordDate = moment(savedData.lastRecordDate).format('Do MMMM YYYY');

      await this.$nextTick();

      this.isFinishedLoading = true;
    } else {
      this.loadDataFromAPI();
    }
  },
};
