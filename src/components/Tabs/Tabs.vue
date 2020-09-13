<template>
  <div class="tabs">
    <div
      class="tabs__tab"
      :class="{ 'tabs__tab--selected': selectedTab === tab }"
      v-for="tab in tabs"
      :key="tab"
      @click="onSelectTab(tab)">
      {{ tab }}
    </div>
  </div>
</template>
<script src="./Tabs.js"></script>
<style src="./Tabs.scss" lang="scss"></style>
