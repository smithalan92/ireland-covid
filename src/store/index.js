/* eslint-disable no-shadow */
import { createStore } from 'vuex';
import moment from 'moment';
import { groupBy } from 'lodash';
import caseData from '@/data.json';
import util from '@/util';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const state = {
  totalIrishCases: 0,
  totalIrishDeaths: 0,
  totalIrishCasesInPast30Days: 0,
  changeInIrishCases: 0,
  changeInIrishDeaths: 0,
  latestIrishDataDateTime: 0,
  totalCorkCases: 0,
  totalCorkCasesInPast30Days: 0,
  latestCorkDataDateTime: 0,
  allCorkData: [],
  orderedCorkData: [],
  pastThreeMonthCorkData: [],
  allIrishData: [],
  orderedIrishData: [],
  pastThreeMonthIrishData: [],
};

const mutations = {
  SET_IRISH_TOTALS(state, data) {
    state.totalIrishCases = data.totalIrishCases;
    state.totalIrishDeaths = data.totalIrishDeaths;
    state.totalIrishCasesInPast30Days = data.totalIrishCasesInPast30Days;
    state.changeInIrishCases = data.changeInIrishCases;
    state.changeInIrishDeaths = data.changeInIrishDeaths;
    state.latestIrishDataDateTime = data.latestIrishDataDateTime;
  },

  SET_CORK_TOTALS(state, data) {
    state.totalCorkCases = data.totalCorkCases;
    state.totalCorkCasesInPast30Days = data.totalCorkCasesInPast30Days;
    state.latestCorkDataDateTime = data.latestCorkDataDateTime;
  },

  SET_CORK_DATA(state, { orderedCorkData, allCorkData, pastThreeMonthCorkData }) {
    state.orderedCorkData = orderedCorkData;
    state.allCorkData = allCorkData;
    state.pastThreeMonthCorkData = pastThreeMonthCorkData;
  },

  SET_IRISH_DATA(state, { orderedIrishData, allIrishData, pastThreeMonthIrishData }) {
    state.orderedIrishData = orderedIrishData;
    state.allIrishData = allIrishData;
    state.pastThreeMonthIrishData = pastThreeMonthIrishData;
  },
};

const actions = {
  processData({ commit }) {
    const totalIrishCases = util.formatNumber(caseData.totalIrishCases);
    const totalIrishDeaths = util.formatNumber(caseData.totalIrishDeaths);
    const { changeInIrishCases } = caseData;
    const { changeInIrishDeaths } = caseData;
    const totalIrishCasesInPast30Days = util.formatNumber(caseData.irishCasesInPast30Days);
    const latestIrishDataDateTime = moment(caseData.latestIrishDataDateTime).format('Do MMMM YYYY');

    const totalCorkCases = util.formatNumber(caseData.totalCasesInCork);
    const totalCorkCasesInPast30Days = util.formatNumber(caseData.totalCorkCasesInPast30Days);
    const latestCorkDataDateTime = moment(caseData.latestCorkDataDateTime).format('Do MMMM YYYY');

    const allCorkData = caseData.corkData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const allIrishData = caseData.irishData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const threeMonthsAgo = moment().subtract('3', 'months');

    const pastThreeMonthCorkData = allCorkData
      .filter(({ date }) => moment(date).isAfter(threeMonthsAgo));

    const pastThreeMonthIrishData = allIrishData
      .filter(({ date }) => moment(date).isAfter(threeMonthsAgo));

    // Group the data nicely by months in reverse
    const groupedCorkData = groupBy(allCorkData, (r) => moment(r.date).format('MMMM'));
    const orderedCorkData = [];

    const groupedIrishData = groupBy(allIrishData, (r) => moment(r.date).format('MMMM'));
    const orderedIrishData = [];

    MONTHS.reverse().forEach((month) => {
      if (groupedCorkData[month]) {
        orderedCorkData.push({
          month,
          data: groupedCorkData[month].sort((a, b) => new Date(a) - new Date(b)),
        });
      }

      if (groupedIrishData[month]) {
        orderedIrishData.push({
          month,
          data: groupedIrishData[month].sort((a, b) => new Date(a) - new Date(b)),
        });
      }
    });

    commit('SET_IRISH_TOTALS', {
      totalIrishCases,
      totalIrishDeaths,
      changeInIrishCases,
      changeInIrishDeaths,
      totalIrishCasesInPast30Days,
      latestIrishDataDateTime,
    });

    commit('SET_CORK_TOTALS', {
      totalCorkCases,
      totalCorkCasesInPast30Days,
      latestCorkDataDateTime,
    });

    commit('SET_CORK_DATA', { orderedCorkData, allCorkData, pastThreeMonthCorkData });
    commit('SET_IRISH_DATA', { orderedIrishData, allIrishData, pastThreeMonthIrishData });
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
