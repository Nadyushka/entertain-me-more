<script setup lang="ts">
import {EButton, EToggleSubscriptionModal} from "@/features";
import WebsiteCard from "@/features/website-subscription/components/website-card.vue";
import {computed, onMounted, ref} from "vue";
import {useWebsitesStore} from "@/stores";
import {storeToRefs} from "pinia";

const websiteStore = useWebsitesStore()
const { websites } = storeToRefs(websiteStore)

const isUnsubscribeModalVisible = ref(false)
const widthWithoutScrollbar = ref(getWidthWithoutScrollbar());

const websitesBlockWidth = computed(()=> {
  if (document.documentElement.clientWidth < 1000) {
    return '100%'
  } else {
    return `${widthWithoutScrollbar} - 320px `
  }
})

onMounted(async () => {
  const res= await websiteStore.getWebsites()
  console.log(res)
})

window.addEventListener('resize', () => {
  widthWithoutScrollbar.value = getWidthWithoutScrollbar();
});


function getWidthWithoutScrollbar() {
  return document.documentElement.clientWidth;
}

function toggleModal (isModalVisible: boolean) {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  if (isModalVisible) {
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth + 10}px`;
  } else {
    document.body.style.overflowY = 'auto';
    document.body.style. paddingRight = '0'
  }

  isUnsubscribeModalVisible.value = isModalVisible
}

async function unsubscribeAll () {
  try {
    await websiteStore.toggleSubscriptionAll(false)
    toggleModal(false)
  } catch (e) {
    console.error(e)
  }
}

async function toggleSubscription (id: number) {
   await websiteStore.toggleSubscription(id)
}
</script>

<template>
  <section class="websites" :style="{width: websitesBlockWidth}">
    <div class="websites__wrapper">
      <div class="websites__header">
        <h2 class="websites__header-title">Ok, let’s change your preferences</h2>
        <EButton
            class="websites__header-unsubscribe"
            title="Unsubscribe from all"
            variant="outlined"
            @click="toggleModal(true)"
        />
      </div>
      <p class="websites__description">To unsubscribe, please uncheck the appropriate box(es).</p>
      <div class="websites__container">
        <WebsiteCard
            v-for="card in websites"
            :id="card.id"
            :title="card.title"
            :is-subscribed="card.isSubscribed"
            :image="card.image"
            @toggleSubscription="toggleSubscription"
        />
      </div>
    </div>
    <EToggleSubscriptionModal
        v-if="isUnsubscribeModalVisible"
        :is-subscribe-modal="false"
        @close="toggleModal(false)"
        @confirm-action="unsubscribeAll"
    />
  </section>
</template>

<style lang="scss" scoped>
.websites {
  position: absolute;
  left: 320px;
  background-color: var(--bg-color-dark);
  min-height: 100vh;

  @media (max-width: 1000px) {
    position: relative;
    left: 0 !important;
    min-height: auto;
  }

  &__wrapper {
    padding: var(--padding-content-desktop);

    @media (max-width: 1200px) {
      padding-left: 48px;
      padding-right: 48px;
    }

    @media (max-width: 1000px) {
      padding: 24px;
    }

    @media (max-width: 720px) {
      padding: 16px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;

    @media (max-width: 720px) {
      flex-direction: column;
    }

    &-title {
      display: inline-block;

      @media (max-width: 720px) {
       margin-bottom: 16px;
      }
    }

    &-unsubscribe {
      flex-shrink: 0;
  }
  }

  &__description {
    font-size: 16px;
    line-height: 24px;
    color: var(--color-main-medium);
    margin-bottom: 24px;

    @media (max-width: 720px) {
      text-align: center;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    @media (max-width: 1400px) {
      gap: 12px;
    }

    @media (max-width: 1100px) {
      justify-content: center;
    }
  }
}
</style>
