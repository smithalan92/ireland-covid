<template>
  <card>
    <template v-slot:title>
      <div
        class="chart-section__title"
        @click="onClickToggle">
        <div class="chart-section__title-text">
          {{ title }} confirmed cases
        </div>
        <caret
          class="chart-section__title-toggle-icon"
          :class="{'chart-section__title-toggle-icon--expanded': isBodyVisible }"/>
      </div>
    </template>
    <template v-slot:body>
      <div
        class="chart-section__body"
        v-if="isBodyVisible">
        <chart
          :categories="categories"
          :data="data"
          series-name="Daily new cases"/>
      </div>
    </template>
  </card>
</template>
<script src="./ChartSection.js"></script>
<style src="./ChartSection.scss" lang="scss"></style>
