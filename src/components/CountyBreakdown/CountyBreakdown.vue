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
      <div class="county-breakdown__map-note">
        Map SVG created using GeoData from <a href="https://www.naturalearthdata.com/" target="_blank">Natural Earth</a>
      </div>
      <div
        class="county-breakdown__tooltip"
        v-show="isTooltipVisible"
        :style="{ left: popupLeft, top: popupTop }">
        <span class="county-breakdown__tooltip-county-name">{{ currentCountyName }}</span>:
        {{ currentCountyCases }} confirmed cases
      </div>
  </div>
</template>
<script src="./CountyBreakdown.js"></script>
<style src="./CountyBreakdown.scss" lang="scss"></style>
