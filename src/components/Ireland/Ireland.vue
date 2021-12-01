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
    <div class="ireland__stats">
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalIrishCasesInPast14Days }}
        </template>
        <template v-slot:subtitle>
          confirmed cases in Ireland in past 14 days.
        </template>
      </card>
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalIrishDeathsInPast30Days }}
        </template>
        <template v-slot:subtitle>
          confirmed deaths in Ireland in past 30 days.
        </template>
      </card>
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalIrishDeathsInPast14Days }}
        </template>
        <template v-slot:subtitle>
          confirmed deaths in Ireland in past 14 days.
        </template>
      </card>
    </div>
    <div class="ireland__stats">
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ latestHospitalData.peopleInHospital }}
        </template>
        <template v-slot:subtitle>
          people in hospital with COVID.
        </template>
      </card>
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ latestHospitalData.peopleInICU }}
        </template>
        <template v-slot:subtitle>
          people in ICU with COVID.
        </template>
      </card>
      <card class="ireland__stats-card">
        <template v-slot:title>
          {{ totalPeopleVaccinated }} ({{ percentagePeopleFullyVaccinated }})
        </template>
        <template v-slot:subtitle>
          people fully vaccinated.
        </template>
      </card>
    </div>
    <div class="ireland__charts">
      <div class="ireland__chart">
        <hospital-chart
          :force-inital-expand="true"
          :records="hospitalData"/>
      </div>
      <div class="ireland__chart">
        <chart-section
          :force-inital-expand="false"
          :records="allIrishCases"
          type="stockChart"
          title="All time cases overview"
          :showTotalFigures="false"/>
      </div>
      <div class="ireland__chart">
        <chart-section
          :force-inital-expand="false"
          :records="allIrishDeaths"
          type="stockChart"
          title="All time deaths overview"
          :showTotalFigures="false"
          yAxisTitle="Number of new deaths"/>
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
