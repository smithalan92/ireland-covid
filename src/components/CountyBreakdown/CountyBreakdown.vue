<template>
  <div class="county-breakdown">
      <div class="county-breakdown__title">
        Most recent county data is estimated to be from {{ latestCorkDataDateTime }}.
      </div>
      <div class="county-breakdown__subtitle">
        Hover over a county to see confirmed cases.
      </div>
      <ireland-map
        class="county-breakdown__map"
        @mouseover="onMouseEnter"/>
      <div class="county-breakdown__color-chart">
        Colour is assigned based on cases per 100k people in previous 14 days
        <div class="county-breakdown__color-chart-row">
          <div class="county-breakdown__color-chart-color county-breakdown__color-chart-low"/>
          <div class="county-breakdown__color-chart-color county-breakdown__color-chart-medium"/>
          <div class="county-breakdown__color-chart-color county-breakdown__color-chart-high"/>
          <div class="county-breakdown__color-chart-color county-breakdown__color-chart-very-high"/>
        </div>
        <div class="county-breakdown__color-chart-row">
           <div class="county-breakdown__color-chart-color-description">
            &lt; 25 cases
          </div>
           <div class="county-breakdown__color-chart-color-description">
            Between 26 and 50 cases
          </div>
          <div class="county-breakdown__color-chart-color-description">
           Between 51 and 99 cases
          </div>
          <div class="county-breakdown__color-chart-color-description">
            More than 100 cases
          </div>
        </div>
      </div>
      <div class="county-breakdown__map-note">
        Map SVG created using GeoData from <a href="https://www.naturalearthdata.com/" target="_blank">Natural Earth</a>
      </div>
      <div
        class="county-breakdown__tooltip"
        v-show="isTooltipVisible"
        :style="{ left: popupLeft, top: popupTop }">
        <div class="county-breakdown__tooltip-county-name">{{ currentCountyName }}</div>
        <span>{{ currentCountyCases }} total confirmed cases.</span>
        <span>{{ currentCounty14DayCases }} cases in previous 14 days.</span>
        <span>{{ currentCounty14DayIncidenceRate }} cases per 100k people in previous 14 days.</span>
      </div>
  </div>
</template>
<script src="./CountyBreakdown.js"></script>
<style src="./CountyBreakdown.scss" lang="scss"></style>
