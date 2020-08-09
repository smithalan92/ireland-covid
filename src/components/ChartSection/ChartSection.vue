<template>
  <div class="chart-section">
    <div
      class="chart-section__header"
      @click="isBodyVisible = !isBodyVisible">
      <div class="chart-section__header-title">{{ title }}</div>
      <div
        class="chart-section__header-toggle"
        :class="{ 'chart-section__header-toggle--body-visible': isBodyVisible }">
        <arrow class="chart-section__header-toggle-arrow"/>
      </div>
    </div>
    <div
      class="chart-section__body"
      v-show="isBodyVisible">
      <chart
        :categories="categories"
        :data="data"
        series-name="Daily new cases"/>
    </div>
  </div>
</template>
<script src="./ChartSection.js"></script>
<style src="./ChartSection.scss" lang="scss"></style>
