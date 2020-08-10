<template>
  <div class="app">
    <div class="app__header">
      <span class="app__header-title">
        Cork daily confirmed COVID-19 cases
      </span>
      <span class="app__header-subtitle">
        All data sourced from <a href="https://covid19ireland-geohive.hub.arcgis.com" target="_blank">HPSC/HSE Geohive</a>. County reporting lags behind by 2 or 3 days.
      </span>
      <span class="app__header-subtitle">
        Latest data is from <span class="app__header-subtitle--bold">{{ lastRecordDate }}</span>
      </span>
      <span class="app__header-subtitle">
        Made by <a
        href="https://github.com/smithalan92"
        target="_blank">github.com/smithalan92</a>
      </span>
    </div>
    <div class="app__body">
      <chart-section
        :force-inital-expand="true"
        :records="allRecords"
        title="All Time"/>
      <chart-section
        v-for="item in orderedData"
        :key="item.month"
        :records="item.data"
        :title="item.month"/>
    </div>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
