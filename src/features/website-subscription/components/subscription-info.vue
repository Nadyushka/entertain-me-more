<script setup lang="ts">
import logo from '@/assets/images/logo.svg';
import {useWebsitesStore} from "@/stores";
import {storeToRefs} from "pinia";
import EToggleSubscriptionModal from "@/features/ui/EToggleSubscriptionModal.vue";
import {ref} from "vue";

const websiteStore = useWebsitesStore()
const { percentOfSubscription } = storeToRefs(websiteStore)

const isSubscribeModalVisible = ref(false)

const toggleModalVisibility = (isVisible: boolean) => isSubscribeModalVisible.value = isVisible

function closeModal () {
  toggleModalVisibility(false)
}

async function subscribeAll () {
  try {
    await websiteStore.toggleSubscriptionAll(true)
    closeModal()
  } catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <aside class="info">
    <div class="info__wrapper">
      <router-link to="/">
        <logo
            class="info__logo"
            width="224"
            height="118"/>
      </router-link>

      <p class="info__text">How much fun <br>
        do you want in your life?</p>

      <a class="info__email" href="mailto:harry.simon@yahoo.com">harry.simon@yahoo.com</a>

      <div class="info__fun">
        <div class="info__fun-label">FUN YOU GET</div>
        <div class="info__fun-visualization">
          <div class="info__fun-total">
            <div class="info__fun-selected" :style="{width: percentOfSubscription}"></div>
          </div>
          <div class="info__fun-summary"> {{ percentOfSubscription }}</div>
        </div>
      </div>

      <p class="info__subscribe-all">
        <button
            type="button"
            class="info__subscribe-all-btn"
            @click="toggleModalVisibility(true)"
        >Subscribe</button>
        to all our fun sites to upgrade your fun progress
      </p>

      <div class="info__footer">
        <address class="info__footer-address">
          EntertainMeMore<br>
          11807 Westheimer 550 PMB617<br>
          Houston, TX 77077
        </address>

        <a class="info__footer-email" href="mailto:contact@entertainmemore.com">contact@entertainmemore.com</a>

        <button class="info__footer-private-policy-btn">Private Policy</button>
      </div>
    </div>

    <EToggleSubscriptionModal
        v-if="isSubscribeModalVisible"
        is-subscribe-modal
        @close="closeModal"
        @confirm-action="subscribeAll"
    />
  </aside>
</template>

<style lang="scss" scoped>
$margin-bottom: 64px;
$subscription-color: #F8B200;

@media (max-width: 800px) {
  $margin-bottom: 32px;
}

.info {
  position: fixed;
  width: 320px;
  z-index: 1;

  @media (max-width: 1000px) {
    position: relative;
    width: 100%;
  }
}

.info__wrapper {
  padding: var(--padding-content-desktop) var(--padding-aside-desktop) var(--padding-aside-desktop);
  height: 100vh;
  background-color: var(--bg-color-light);
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    padding: 8px;
  }
}

.info__logo {
  margin-bottom: $margin-bottom;
}

.info__text,
.info__email {
  font-size:16px;
  line-height: 16px;
  margin-bottom: $margin-bottom;
  color: var(--color-main);
}

.info__email {
  cursor: pointer;
  margin-bottom: calc($margin-bottom / 4);
}

.info__fun {
  margin-bottom: calc($margin-bottom / 4);

  &-label {
    font-size: 12px;
    line-height: 18px;
    color: var(--color-main-light);
  }

  &-visualization {
    display: flex;
    gap: 16px;
    justify-content: space-between;
  }

  &-total {
    flex-grow: 0;
    border-radius: 8px;
    height: 16px;
    width: max( calc(176 / 320 * 100%), 85%);
    background-color: var(--color-main);
    overflow: hidden;
  }


  &-selected {
    height: 100%;
    background-color: $subscription-color;
    transition: 0.2s all;
  }

  &-summary {
    color: $subscription-color;
    font-size: 16px;
    line-height: 16px;
  }
}


.info__subscribe-all {
  margin-bottom: auto;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-main-light);

  @media (max-width: 1000px) {
    margin-bottom: 16px;
  }

  &-btn {
    color: var(--color-accent);
    position: relative;
    transition: 0.2s all;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      transition: 0.2s all;
      height: 1px;
      width: 0;
      background-color: var(--color-accent);
    }

    &:hover::before {
      width: 100%;
    }
  }
}

.info__footer {
  font-size: 12px;
  line-height: 18px;
  color: var(--color-main-medium);
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  &-email {
    text-decoration: underline;
  }

  &-private-policy-btn {
    position: relative;
    transition: 0.2s all;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      transition: 0.2s all;
      height: 1px;
      width: 0;
      background-color: var(--color-main-medium);
    }

    &:hover::before {
      width: 100%;
    }
  }
}

</style>
