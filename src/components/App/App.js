/* eslint-disable no-param-reassign */
import ChartSection from '@/components/ChartSection';
import axios from 'axios';
import moment from 'moment';
import { groupBy } from 'lodash';

const CACHE_KEY = 'v1';

const MONTH_ORDER = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default {
  name: 'App',

  components: {
    ChartSection,
  },

  data() {
    return {
      categories: [],
      data: [],
      orderedData: [],
    };
  },

  methods: {
    parseData(savedData) {
      const groupedData = groupBy(savedData, (r) => moment(r.date).format('MMMM'));
      MONTH_ORDER.reverse().forEach((month) => {
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

    if (savedData && moment(savedData.lastRecordDate).isSame(moment(), 'day')) {
      this.parseData(savedData.data);
      return;
    }

    const { data } = await axios.get('https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?f=json&where=(TimeStamp%3Etimestamp%20%272020-03-20%2023%3A59%3A59%27)%20AND%20(CountyName%3D%27Cork%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TimeStamp%20asc&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true');

    const lastRecordDate = moment(data.features[data.features.length - 1].TimeStamp);

    if (savedData && lastRecordDate.isSame(moment(savedData.lastRecordDate), 'day')) {
      this.restoreSavedData(savedData);
      return;
    }

    const corkData = data.features.map((r, index) => {
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
      };
    });

    const dataToSave = {
      lastRecordDate,
      data: corkData,
    };

    localStorage.setItem(`cached-data-${CACHE_KEY}`, JSON.stringify(dataToSave));

    this.parseData(corkData);
  },
};
