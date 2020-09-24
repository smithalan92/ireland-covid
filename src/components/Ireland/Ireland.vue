<template>
  <div class="ireland">
    <div class="ireland__stats">
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalIrishCases }} (+{{ changeInIrishCases }})
        </template>
        <template v-slot:subtitle>
          confirmed cases in Ireland as of {{ latestIrishDataDateTime }}.
        </template>
      </card>
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalIrishDeaths }} (+{{ changeInIrishDeaths }})
        </template>
        <template v-slot:subtitle>
          confirmed deaths in Ireland as of {{ latestIrishDataDateTime }}.
        </template>
      </card>
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalIrishCasesInPast30Days }}
        </template>
        <template v-slot:subtitle>
          confirmed cases in Ireland in past 30 days.
        </template>
      </card>
    </div>
    <div class="ireland__charts">
      <div class="ireland__chart">
        <chart-section
          :force-inital-expand="true"
          :records="allIrishData"
          type="stockChart"
          title="All time overview"/>
      </div>
      <div
        class="ireland__chart"
        v-for="item in orderedIrishData"
        :key="item.month">
        <chart-section
          :records="item.data"
          :title="item.month"
          :force-inital-expand="false"/>
      </div>
    </div>
  </div>
</template>
<script src="./Ireland.js"></script>
<style src="./Ireland.scss" lang="scss"></style>
