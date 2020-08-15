<template>
  <v-app>
    <v-main>
      <v-container class="fill-height align-start">
        <v-row>
          <v-col cols="12">
            <v-row class="text-center">
              <v-row>
                <v-col cols="12">
                  <span class="text-h4 font-weight-bold">
                    Cork daily confirmed COVID-19 cases
                  </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span class="my-8">
                    All data sourced from <a href="https://covid19ireland-geohive.hub.arcgis.com" target="_blank">HPSC/HSE Geohive</a>. County reporting lags behind by a few days.
                  </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span class="my-8">
                    Latest data is from
                    <span class="font-weight-bold">{{ lastRecordDate }}</span>.
                    There were
                    <span class="font-weight-bold">
                      {{ totalCases }}
                    </span> confirmed cases in Cork at that time.
                  </span>
                </v-col>
              </v-row>
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
                  v-for="item in orderedData"
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
      </v-container>
    </v-main>
    <v-footer>
      <v-row align-content="center">
        <v-col
          class="text-center"
          cols="12">
          Made by <a
            href="https://github.com/smithalan92"
            target="_blank">github.com/smithalan92</a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
