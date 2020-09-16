<template>
  <div class="app">
    <div class="app__header">
     <div class="app__header-title">Cork confirmed COVID-19 cases</div>
     <tabs
        class="app__tabs"
        @selectTab="selectTab"/>
    </div>
    <div class="app__container">
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
