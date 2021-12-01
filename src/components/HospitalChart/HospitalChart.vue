<template>
  <div ref="containerEl">
    <card>
      <template v-slot:title>
        <div
          class="chart-section__title"
          @click="onClickToggle">
          <div class="chart-section__title-text-wrapper">
            <div>People in Hospital and ICU Overview</div>
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
            :type="'chart'"
            :categories="categories"
            :series="series"
            yAxisTitle="Hospital Case Numbers"/>
        </div>
      </template>
    </card>
  </div>
</template>
<script src="./HospitalChart.js"></script>
<style src="./HospitalChart.scss" lang="scss"></style>
