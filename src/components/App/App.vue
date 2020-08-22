<template>
  <v-app>
    <v-main>
      <v-app-bar
        class="justify-center"
        :fixed="true"
        color="grey lighten-3">
          <v-toolbar-title class="flex-grow-1 text-h5 font-weight-bold text-center">
            Cork confirmed COVID-19 cases
          </v-toolbar-title>
      </v-app-bar>
      <v-container class="app__container fill-height align-start">
        <v-row>
          <v-col
            class="d-flex justify-center"
            cols="12"
            v-if="!isFinishedLoading">
            <v-icon
              class="app__loading-icon"
              large>
              {{ mdiLoading }}
            </v-icon>
          </v-col>
          <v-col
           cols="12"
           v-show="isFinishedLoading">
            <v-row>
              <v-col cols="4">
                <v-card>
                  <v-card-title>
                    {{ latestCorkDataDateTime }}
                  </v-card-title>
                  <v-card-subtitle>
                    latest data provided for Cork.
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card>
                  <v-card-title>
                    {{ totalCorkCases }}
                  </v-card-title>
                  <v-card-subtitle>
                    total confirmed cases in Cork.
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card>
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
              <v-col cols="6">
                <v-card>
                  <v-card-title>
                    {{ totalIrishCases }}
                  </v-card-title>
                  <v-card-subtitle>
                    confirmed cases in Ireland as of {{ latestIrishDataDateTime }}.
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title>
                    {{ totalIrishDeaths }}
                  </v-card-title>
                  <v-card-subtitle>
                    confirmed deaths in Ireland as of {{ latestIrishDataDateTime }}.
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
    <v-footer class="flex-column">
      <v-row class="flex-column text-center">
        <v-row>
          <v-col cols="12">
            <span class="my-8">
              All data sourced from <a href="https://covid19ireland-geohive.hub.arcgis.com" target="_blank">HPSC/HSE Geohive</a>. County reporting lags behind by a few days.
            </span>
          </v-col>
        </v-row>
      </v-row>
      <v-row align-content="center">
        <v-col
          class="text-center"
          cols="12">
          Data automatically refreshes at 7pm each day.<br>Made by <a
            href="https://github.com/smithalan92"
            target="_blank">github.com/smithalan92</a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
