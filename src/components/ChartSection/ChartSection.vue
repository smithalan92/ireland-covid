<template>
  <v-card>
    <v-card-title
      class="chart-section__header"
      @click="onClickToggle">
     <v-col cols="11">
        {{ title }}
      </v-col>
      <v-col
        class="d-flex justify-center align-center"
        cols="1">
        <arrow
          class="chart-section__header-toggle-arrow"
          :class="{ 'chart-section__header-toggle-arrow--expanded': isBodyVisible }"/>
      </v-col>
    </v-card-title>
    <v-card-text v-show="isBodyVisible">
      <chart
        :categories="categories"
        :data="data"
        series-name="Daily new cases"/>
    </v-card-text>
  </v-card>
</template>
<script src="./ChartSection.js"></script>
<style src="./ChartSection.scss" lang="scss"></style>
