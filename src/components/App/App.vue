<template>
  <div
    :class="appClassesToApply">
    <div class="app__header">
     <div class="app__header-title">COVID-19 cases in Ireland</div>
     <tabs
        class="app__tabs"
        @select-tab="selectTab"/>
    </div>
    <div class="app__container">
      <div class="app__deprecation">
        These dashboards are no longer updated as COVID updates are
        <a href="https://www.thejournal.ie/covid-19-cases-daily-updates-end-5751333-Apr2022/" target="_blank">no longer published daily</a>
        by the department of Health.
      </div>
      <div class="app__last-updated">
       Last updated on the {{ lastDataUpdateDateTime }}
      </div>
      <router-view class="app__content"/>
    </div>
    <div class="app__footer">
      <div class="app__footer-text">
        All data sourced from <a href="https://covid19ireland-geohive.hub.arcgis.com" target="_blank">HPSC/HSE Geohive</a>. County reporting lags behind by a few days.
      </div>
      <div class="app__footer-text">
        Data automatically refreshes at 7pm each day.<br>Made by <a
          href="https://github.com/smithalan92"
          target="_blank">github.com/smithalan92</a>
      </div>
    </div>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
<style src="../../styles/font.scss" lang="scss"></style>
