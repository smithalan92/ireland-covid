<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="4">
          <v-card height="100%">
            <v-card-title>
              {{ latestCorkDataDateTime }}
            </v-card-title>
            <v-card-subtitle>
              latest data provided for Cork.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="100%">
            <v-card-title>
              {{ totalCorkCases }}
            </v-card-title>
            <v-card-subtitle>
              total confirmed cases in Cork.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="100%">
            <v-card-title>
              {{ totalCorkCasesInPast30Days }}
            </v-card-title>
            <v-card-subtitle>
              confirmed cases in Cork in past 30 days.
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
            v-for="item in orderedCorkData"
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
<script src="./Cork.js"></script>
<style src="./Cork.scss" lang="scss"></style>
