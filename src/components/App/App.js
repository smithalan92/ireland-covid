/* eslint-disable no-param-reassign */
import ChartSection from '@/components/ChartSection';
import axios from 'axios';
import moment from 'moment';
import { groupBy } from 'lodash';

const CACHE_KEY = 'v2';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// These URLs seems to be static...for now anyway.
const CORK_DATA_URL = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?f=json&where=(TimeStamp%3Etimestamp%20%272020-03-20%2023%3A59%3A59%27)%20AND%20(CountyName%3D%27Cork%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TimeStamp%20asc&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true';

export default {
  name: 'App',

  components: {
    ChartSection,
  },

  data() {
    return {
      orderedData: [],
      allData: [],
      lastRecordDate: null,
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
  },

  methods: {
    parseData(savedData) {
      const groupedData = groupBy(savedData, (r) => moment(r.date).format('MMMM'));
      MONTHS.reverse().forEach((month) => {
        if (groupedData[month]) {
          this.orderedData.push({
            month,
            data: groupedData[month].sort((a, b) => new Date(a) - new Date(b)),
          });
        }
      });
    },
  },

  async created() {
    const savedData = JSON.parse(localStorage.getItem(`cached-data-${CACHE_KEY}`));

    // If today is the same date as the last record date, just use the cache
    if (savedData && moment(savedData.lastRecordDate).isSame(moment(), 'day')) {
      this.orderedData = savedData.data;
      this.lastRecordDate = moment(savedData.lastRecordDate).format('Do MMMM YYYY');
      return;
    }

    const { data } = await axios.get(CORK_DATA_URL);

    // We're getting bad timestamps back from the API. Need to filter out timestamps in the future
    let corkData = data.features.filter(({ attributes }) => !moment(attributes.TimeStamp).isAfter(moment(), 'day'));

    const latestTimestamp = corkData[corkData.length - 1].attributes.TimeStamp;
    const lastRecordDate = moment(latestTimestamp);

    this.lastRecordDate = lastRecordDate.format('Do MMMM YYYY');

    // If the latest record from the API is the same as the cached last record date
    // just use the cache
    if (savedData && lastRecordDate.isSame(moment(savedData.lastRecordDate), 'day')) {
      this.orderedData = savedData.data;
      return;
    }

    corkData = corkData.map((r, index) => {
      const { ConfirmedCovidCases, TimeStamp } = r.attributes;
      let casesSincePrevious = 0;

      if (index > 0) {
        const previousConfirmedCases = data.features[index - 1].attributes.ConfirmedCovidCases;
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

    this.parseData(corkData);

    const dataToSave = {
      lastRecordDate,
      data: this.orderedData,
    };

    localStorage.setItem(`cached-data-${CACHE_KEY}`, JSON.stringify(dataToSave));
  },
};
