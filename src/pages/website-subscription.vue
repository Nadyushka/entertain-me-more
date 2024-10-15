<script setup lang="ts">
import {SubscriptionInfo, WebsitesToSubscribe} from "@/features";
</script>

<template>
  <main class="content">
    <div class="content__wrapper">
      <h1 class="visually-hidden">ENTERTAIN ME MORE</h1>
      <div class="content__inner">
        <subscription-info/>
        <websites-to-subscribe/>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px ;
  background-color: var(--boder-color);
  min-height: 100vh;

  @media (max-width: 2020px) {
    padding: 0;
  }
}

.content__wrapper {
  width: 100%;
  max-width: 1920px;
  min-height: calc(100vh - 80px);

  @media (max-width: 1600px) {
    min-height: 100vh;
    width: 100%;
  }
}

.content__inner {
  display: flex;
  min-height: calc(100vh - 80px);

  @media (max-width: 1920px) {
    min-height: 100vh;
  }

  @media (max-width: 1100px) {
    display: block;
  }
}
</style>
