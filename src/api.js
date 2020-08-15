import axios from 'axios';

// These URLs seems to be static...for now anyway.
const TOTAL_CASE_DATA_URL = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19StatisticsProfileHPSCIrelandView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22TotalConfirmedCovidCases%22%2C%22outStatisticFieldName%22%3A%22TotalConfirmedCovidCases_max%22%2C%22statisticType%22%3A%22max%22%7D%5D';
const TOTAL_DEATH_DATA_URL = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19StatisticsProfileHPSCIrelandView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22TotalCovidDeaths%22%2C%22outStatisticFieldName%22%3A%22TotalCovidDeaths_max%22%2C%22statisticType%22%3A%22max%22%7D%5D';
const CORK_DATA_URL = 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?f=json&where=(TimeStamp%3Etimestamp%20%272020-03-20%2023%3A59%3A59%27)%20AND%20(CountyName%3D%27Cork%27)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TimeStamp%20asc&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true';

async function getTotalIrishCases() {
  const { data } = await axios.get(TOTAL_CASE_DATA_URL);

  return data.features[0].attributes.TotalConfirmedCovidCases_max;
}

async function getTotalIrishDeaths() {
  const { data } = await axios.get(TOTAL_DEATH_DATA_URL);

  return data.features[0].attributes.TotalCovidDeaths_max;
}

async function getCorkCaseBreakdown() {
  const { data } = await axios.get(CORK_DATA_URL);

  return data.features.map((r) => r.attributes);
}

export default {
  getTotalIrishCases,
  getTotalIrishDeaths,
  getCorkCaseBreakdown,
};
