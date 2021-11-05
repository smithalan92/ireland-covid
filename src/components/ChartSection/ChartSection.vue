<template>
  <card>
    <template v-slot:title>
      <div
        class="chart-section__title"
        @click="onClickToggle">
        <div class="chart-section__title-text-wrapper">
          <div>{{ title }} confirmed cases</div>
          <div v-if="showTotalFigures" class="chart-section__title-total-figures">
            New Cases - {{ totalFigures.cases }} | New Deaths - {{ totalFigures.deaths }}
          </div>
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
          :type="type"
          :categories="categories"
          :series="series"/>
      </div>
    </template>
  </card>
</template>
<script src="./ChartSection.js"></script>
<style src="./ChartSection.scss" lang="scss"></style>
