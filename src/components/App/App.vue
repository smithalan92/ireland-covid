<template>
  <div class="app">
    <div class="app__header">
      <span class="app__header-title">
        Cork daily confirmed COVID-19 cases
      </span>
      <span class="app__header-subtitle">
        All data sourced from <a href="https://covid19ireland-geohive.hub.arcgis.com" target="_blank">HPSC/HSE Geohive</a>. County reporting lags behind by a few days.
      </span>
      <span class="app__header-subtitle">
        Latest data is from
        <span class="app__header-subtitle--bold">{{ lastRecordDate }}</span>.
        There were
        <span class="app__header-subtitle--bold">
          {{ totalCases }}
        </span> confirmed cases in Cork at that time.
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
        :title="item.month"
        :force-inital-expand="false"/>
    </div>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
