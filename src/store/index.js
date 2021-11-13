/* eslint-disable no-shadow */
import { createStore } from 'vuex';
import moment from 'moment';
import { groupBy } from 'lodash';
import caseData from '@/data.json';
import util from '@/util';

const state = {
  lastDataUpdateDateTime: '',
  totalIrishCases: 0,
  totalIrishDeaths: 0,
  totalIrishCasesInPast30Days: 0,
  totalIrishDeathsInPast30Days: 0,
  totalIrishCasesInPast14Days: 0,
  totalIrishDeathsInPast14Days: 0,
  changeInIrishCases: 0,
  changeInIrishDeaths: 0,
  latestIrishDataDateTime: '',
  totalCorkCases: 0,
  totalCorkCasesInPast30Days: 0,
  totalCorkCasesInPast14Days: 0,
  latestCorkDataDateTime: '',
  allCorkData: [],
  orderedCorkData: [],
  pastThreeMonthCorkData: [],
  allIrishData: [],
  orderedIrishData: [],
  pastThreeMonthIrishData: [],
  countyData: {},
  totalPeopleVaccinated: 0,
  percentagePeopleFullyVaccinated: 0,
  peopleInICU: 0,
  peopleInHospital: 0,
};

const mutations = {
  SET_LAST_UPDATED_DATE(state, lastDataUpdateDateTime) {
    state.lastDataUpdateDateTime = lastDataUpdateDateTime;
  },

  SET_IRISH_TOTALS(state, data) {
    state.totalIrishCases = data.totalIrishCases;
    state.totalIrishDeaths = data.totalIrishDeaths;
    state.totalIrishCasesInPast30Days = data.totalIrishCasesInPast30Days;
    state.totalIrishCasesInPast14Days = data.totalIrishCasesInPast14Days;
    state.totalIrishDeathsInPast30Days = data.totalIrishDeathsInPast30Days;
    state.totalIrishDeathsInPast14Days = data.totalIrishDeathsInPast14Days;
    state.changeInIrishCases = data.changeInIrishCases;
    state.changeInIrishDeaths = data.changeInIrishDeaths || 0;
    state.latestIrishDataDateTime = data.latestIrishDataDateTime;
  },

  SET_CORK_TOTALS(state, data) {
    state.totalCorkCases = data.totalCorkCases;
    state.totalCorkCasesInPast30Days = data.totalCorkCasesInPast30Days;
    state.totalCorkCasesInPast14Days = data.totalCorkCasesInPast14Days;
    state.latestCorkDataDateTime = data.latestCorkDataDateTime;
  },

  SET_CORK_DATA(state, { orderedCorkData, allCorkData }) {
    state.orderedCorkData = orderedCorkData;
    state.allCorkData = allCorkData;
  },

  SET_IRISH_DATA(state, { orderedIrishData, allIrishData }) {
    state.orderedIrishData = orderedIrishData;
    state.allIrishData = allIrishData;
  },

  SET_COUNTY_DATA(state, countyData) {
    state.countyData = countyData;
  },

  SET_OTHER_DATA(state, {
    totalPeopleVaccinated,
    percentagePeopleFullyVaccinated,
    peopleInICU,
    peopleInHospital,
  }) {
    state.totalPeopleVaccinated = totalPeopleVaccinated;
    state.percentagePeopleFullyVaccinated = percentagePeopleFullyVaccinated;
    state.peopleInICU = peopleInICU;
    state.peopleInHospital = peopleInHospital;
  },
};

const actions = {
  processData({ commit }) {
    const totalIrishCases = util.formatNumber(caseData.totalIrishCases);
    const totalIrishDeaths = util.formatNumber(caseData.totalIrishDeaths);
    const { changeInIrishCases, changeInIrishDeaths } = caseData;
    const totalIrishCasesInPast30Days = util.formatNumber(caseData.irishCasesInPast30Days);
    const totalIrishCasesInPast14Days = util.formatNumber(caseData.irishCasesInPast14Days);
    const totalIrishDeathsInPast30Days = util.formatNumber(caseData.irishDeathsInPast30Days);
    const totalIrishDeathsInPast14Days = util.formatNumber(caseData.irishDeathsInPast14Days);

    const lastDataUpdateDateTime = moment(caseData.lastDataUpdateDateTime).format('Do MMMM YYYY HH:mm');
    const latestIrishDataDateTime = moment(caseData.latestIrishDataDateTime).format('Do MMMM YYYY');

    const totalCorkCases = util.formatNumber(caseData.totalCasesInCork);
    const totalCorkCasesInPast30Days = util.formatNumber(caseData.totalCorkCasesInPast30Days);
    const totalCorkCasesInPast14Days = util.formatNumber(caseData.totalCorkCasesInPast14Days);
    const latestCorkDataDateTime = moment(caseData.latestCorkDataDateTime).format('Do MMMM YYYY');

    const allCorkData = caseData.corkData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const allIrishData = caseData.irishData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((r) => {
        // eslint-disable-next-line no-param-reassign
        if (!r.newDeaths) r.newDeaths = 0;
        return r;
      });

    const { countyData } = caseData;

    // Group the data by year
    const groupedCorkDataByYear = groupBy(allCorkData, (r) => new Date(r.date).getFullYear());
    const orderedCorkData = [];
    // Then group the data by month within each year
    Object.keys(groupedCorkDataByYear).forEach((yr) => {
      groupedCorkDataByYear[yr] = groupBy(groupedCorkDataByYear[yr], (r) => new Date(r.date).getMonth());
    });

    // Group the data by year
    const groupedIrishDataByYear = groupBy(allIrishData, (r) => new Date(r.date).getFullYear());
    const orderedIrishData = [];

    // Then group the data by month within each year
    Object.keys(groupedIrishDataByYear).forEach((yr) => {
      groupedIrishDataByYear[yr] = groupBy(groupedIrishDataByYear[yr], (r) => new Date(r.date).getMonth());
    });

    // Now we go over all the data ( by year, then month), and process it into a structure that can be consumed by the view
    [
      { data: groupedIrishDataByYear, orderedArray: orderedIrishData },
      { data: groupedCorkDataByYear, orderedArray: orderedCorkData },
    ]
      .forEach(({ orderedArray, data }) => {
        Object.keys(data)
          .sort((a, b) => b - a) // This will sort the year in DESC order, as each key is the 0 based month num
          .forEach((year) => {
            const monthlyCaseData = data[year];

            Object.keys(monthlyCaseData)
              .sort((a, b) => b - a) // This will sort the month in DESC order, each key is the 0 based month num
              .forEach((month) => {
                // MMMM - YYYY will be the format
                const monthName = new Date(monthlyCaseData[month][0].date).toLocaleString('default', { month: 'long', year: 'numeric' });

                orderedArray.push({
                  month: monthName,
                  data: monthlyCaseData[month].sort((a, b) => new Date(a.date) - new Date(b.date)),
                });
              });
          });
      });

    commit('SET_LAST_UPDATED_DATE', lastDataUpdateDateTime);

    commit('SET_IRISH_TOTALS', {
      totalIrishCases,
      totalIrishDeaths,
      changeInIrishCases,
      changeInIrishDeaths,
      totalIrishCasesInPast30Days,
      totalIrishCasesInPast14Days,
      totalIrishDeathsInPast30Days,
      totalIrishDeathsInPast14Days,
      latestIrishDataDateTime,
    });

    commit('SET_CORK_TOTALS', {
      totalCorkCases,
      totalCorkCasesInPast30Days,
      totalCorkCasesInPast14Days,
      latestCorkDataDateTime,
    });

    commit('SET_CORK_DATA', { orderedCorkData, allCorkData });
    commit('SET_IRISH_DATA', { orderedIrishData, allIrishData });
    commit('SET_COUNTY_DATA', countyData);

    commit('SET_OTHER_DATA', {
      totalPeopleVaccinated: util.formatNumber(caseData.totalPeopleVaccinated),
      percentagePeopleFullyVaccinated: `${caseData.percentagePeopleFullyVaccinated}%`,
      peopleInICU: util.formatNumber(caseData.peopleInICU),
      peopleInHospital: util.formatNumber(caseData.peopleInHospital),
    });
  },
};

const getters = {};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
