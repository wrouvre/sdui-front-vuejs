<!-- Carousel.vue -->
<template>
  <div class="carousel">
    <div class="slide" v-for="(slide, index) in slides" :key="index">
      <img :src="slide.imageUrl" :alt="slide.caption" />
      <p>{{ slide.caption }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'Carousel',
  props: {
    slides: { type: Array as PropType<{ imageUrl: string; caption: string }[]>, required: true }
  }
})
</script>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slide {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.slide img {
  width: 100%;
  height: auto;
}
</style>
