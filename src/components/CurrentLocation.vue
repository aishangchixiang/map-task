<template>
    <div>
      <button @click="getCurrentLocation">Get Current Location</button>
    <h2>Current Location</h2>
    <p v-if="currentPlace">Name: {{ currentPlace.name }}</p>
    <p v-if="currentPlace">Latitude: {{ currentPlace.location.lat }}</p>
    <p v-if="currentPlace">Longitude: {{ currentPlace.location.lng }}</p>
    <p v-if="currentPlace">Timezone: {{ currentPlace.timezone }}</p>
    <p v-if="currentPlace">Local Time: {{ currentPlace.localTime }}</p>
  </div>
</template>


<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    export default {
        setup() {
        const store = useStore()
        const currentPlace = computed(() => store.getters.currentLocation)
        const latestPlace = computed(() => store.getters.latestPlace)
        function getCurrentLocation() {
          store.dispatch('getCurrentLocation')
        }

        return {
          getCurrentLocation,
          latestPlace,
          currentPlace
      }
    }
  }
  </script>