<template>
  <div class="cork">
    <div class="cork__stats">
      <card class="cork__stats-card">
        <template v-slot:title>
          {{ latestCorkDataDateTime }}
        </template>
        <template v-slot:subtitle>
          latest data provided for Cork.
        </template>
      </card>
      <card class="cork__stats-card">
        <template v-slot:title>
          {{ totalCorkCases }}
        </template>
        <template v-slot:subtitle>
          total confirmed cases in Cork.
        </template>
      </card>
      <card class="cork__stats-card">
        <template v-slot:title>
          {{ totalCorkCasesInPast30Days }}
        </template>
        <template v-slot:subtitle>
          confirmed cases in Cork in past 30 days.
        </template>
      </card>
    </div>
    <div class="cork__charts">
      <div class="cork__chart">
        <chart-section
          :force-inital-expand="true"
          :records="allCorkData"
          title="All Time"/>
      </div>
      <div
        class="cork__chart"
        v-for="item in orderedCorkData"
        :key="item.month">
        <chart-section
          :records="item.data"
          :title="item.month"
          :force-inital-expand="false"/>
      </div>
    </div>
  </div>
</template>
<script src="./Cork.js"></script>
<style src="./Cork.scss" lang="scss"></style>
