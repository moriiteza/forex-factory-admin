<template>
  <div id="table-loading" class="loading-container">
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.loading-container {
  width: 80px;
  height: 100px;
  margin: 100px auto;

  .block {
    position: relative;
    box-sizing: border-box;
    float: left;
    margin: 0 10px 10px 0;
    width: 12px;
    height: 12px;
    border-radius: 0px;

    &:nth-child(4n + 1) {
      animation: wave 2s ease 0s infinite;
    }

    &:nth-child(4n + 2) {
      animation: wave 2s ease 0.2s infinite;
    }

    &:nth-child(4n + 3) {
      animation: wave 2s ease 0.4s infinite;
    }

    &:nth-child(4n + 4) {
      animation: wave 2s ease 0.6s infinite;
      margin-right: 0;
    }
  }
}

@keyframes wave {
  0% {
    top: 0;
    opacity: 1;
  }
  50% {
    top: 30px;
    opacity: 0.2;
  }
  100% {
    top: 0;
    opacity: 1;
  }
}
</style>
