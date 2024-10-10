<template>
  <GMapMap
    :center="{ lat: 51.5072, lng: 0.1276 }"
    :zoom="7"
    map-type-id="terrain"
    style="width: 100vw; height: 900px"
  >
  </GMapMap>
  <div>
    <Carousel :slides="carouselSlides" />
    <Button text="View Products" action="navigateToList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ref as firebaseRef, onValue } from 'firebase/database'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { database, storage } from '@/firebase'
import Carousel from '@/components/Carousel.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Carousel
  },
  setup() {
    const carouselSlides = ref([])

    const loadCarouselSlides = async () => {
      const q = firebaseRef(database, 'sduijson')
      onValue(q, (snapshot) => {
        const sduijson = snapshot.val()
        if (sduijson && sduijson.pages && sduijson.pages.length > 0) {
          const homePage = sduijson.pages.find((page: any) => page.name === 'Home')
          if (
            homePage &&
            homePage.components &&
            homePage.components.length > 0 &&
            homePage.components[0].type === 'carousel'
          ) {
            const slides = homePage.components[0].slides
            // Pour chaque diapositive du carrousel, récupérez l'URL de téléchargement de l'image à partir de Firebase Storage
            Promise.all(
              slides.map(async (slide: any) => {
                const imageRef = storageRef(storage, slide.image)
                slide.imageUrl = await getDownloadURL(imageRef)
              })
            ).then(() => {
              carouselSlides.value = slides
            })
          }
        }
      })
    }

    loadCarouselSlides()

    return {
      carouselSlides
    }
  },
  methods: {
    navigateToList() {
      this.$router.push({ name: 'ProductListView' })
    }
  }
})
</script>
