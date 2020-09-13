<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="4">
          <v-card height="100%">
            <v-card-title>
              {{ totalIrishCases }} (+{{ changeInIrishCases }})
            </v-card-title>
            <v-card-subtitle>
              confirmed cases in Ireland as of {{ latestIrishDataDateTime }}.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="100%">
            <v-card-title>
              {{ totalIrishDeaths }} (+{{ changeInIrishDeaths }})
            </v-card-title>
            <v-card-subtitle>
              confirmed deaths in Ireland as of {{ latestIrishDataDateTime }}.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="100%">
            <v-card-title>
              {{ totalIrishCasesInPast30Days }}
            </v-card-title>
            <v-card-subtitle>
              confirmed cases in Ireland in past 30 days.
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              class="pb-0"
              cols="12">
              <chart-section
                :force-inital-expand="true"
                :records="allRecords"
                title="All Time"/>
            </v-col>
          </v-row>
          <v-row
            v-for="item in orderedIrishData"
            :key="item.month">
            <v-col
              class="pb-0"
              cols="12">
              <chart-section
                :records="item.data"
                :title="item.month"
                :force-inital-expand="false"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script src="./Ireland.js"></script>
<style src="./Ireland.scss" lang="scss"></style>
