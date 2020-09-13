<template>
  <v-app>
    <v-main>
      <v-app-bar
        class="justify-center"
        :fixed="true">
          <v-toolbar-title class="flex-grow-1 text-h5 font-weight-bold text-center">
            Cork confirmed COVID-19 cases
          </v-toolbar-title>
      </v-app-bar>
      <v-container class="app__container fill-height align-start">
        <tabs @selectTab="selectTab"/>
        <router-view class="app__content"/>
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
