<template>
  <div class="tabs">
    <div
      class="tabs__tab"
      :class="{ 'tabs__tab--selected': selectedTab.route === tab.route }"
      v-for="tab in tabs"
      :key="tab.route"
      @click="onSelectTab(tab)">
      {{ tab.label }}
    </div>
  </div>
</template>
<script src="./Tabs.js"></script>
<style src="./Tabs.scss" lang="scss"></style>
