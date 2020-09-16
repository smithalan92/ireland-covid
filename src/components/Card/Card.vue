<template>
  <div class="card">
    <div class="card__title">
      <slot name="title"/>
    </div>
    <div class="card__body">
      <slot name="body"/>
    </div>
  </div>
</template>
<script src="./Card.js"></script>
<style src="./Card.scss" lang="scss"></style>
