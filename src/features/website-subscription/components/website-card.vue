<script setup lang="ts">
import CheckedIcon from "../../../../public/checked-icon.svg"
import {EButton} from "@/features";
import {computed} from "vue";

const props = defineProps<{
  id: {
    type:String,
    required: true,
  },
  title: {
    type:String,
    required: true,
  },
  isSubscribed: {
    type: Boolean,
    required: true,
  },
  image: {
    type:String,
    required: true,
  }
}>()

const emit = defineEmits<{
  (emit: 'toggle-subscription', id: number): void
}
>()

const buttonTitle = computed(() => props.isSubscribed ? 'Subscribed' : 'Subscribe');
const setImage = (imageTitle: string) => {
  switch (imageTitle) {
    case 'film-quiz':
      return '/film-quiz.png';
    case 'geography-quiz':
      return '/geography-quiz.png';
    case 'historical-quiz':
      return '/historical-quiz.png';
    case 'science-quiz':
      return '/science-quiz.png';
    case 'song-quiz':
      return '/song-quiz.png';
    case 'sport-quiz':
      return '/sport-quiz.png';
    case 'trivia':
      return '/trivia.png';
  }
}

function toggleSubscription () {
  emit('toggle-subscription', props.id)
}

</script>

<template>
  <div class="website-card">
      <div class="website-card__image-wrapper">
        <img class="website-card__image" :src="setImage(props.image)" alt="website logo" width="270" height="168"/>
      </div>
      <h3 class="website-card__title">{{props.title}}</h3>
      <EButton
          class="website-card__btn"
          :title="buttonTitle"
          :left-icon="props.isSubscribed"
          variant="rounded"
          @click="toggleSubscription"
      >
        <template v-if="props.isSubscribed" #left-icon>
          <CheckedIcon/>
        </template>
      </EButton>
  </div>
</template>

<style scoped lang="scss">
.website-card {
  max-width: 318px;
  padding: 24px;
  background-color: var(--bg-color-light);
  border-radius:8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  &__image-wrapper {
    width: 100%;
    border: 1px solid var(--boder-color);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__image {
   object-fit: contain;
  }

  &__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: auto;
    font-size: 16px;
    line-height: 24px;
    color: var(--color-main);
    font-weight: 400;
  }

  &__btn {
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
