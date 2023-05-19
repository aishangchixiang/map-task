<template>
    <div>
      <button @click="getCurrentLocation">Get Current Location</button>
    <h2>Current Location</h2>
    <p v-if="latestPlace">Name: {{ latestPlace.name }}</p>
    <p v-if="latestPlace">Latitude: {{ latestPlace.location.lat }}</p>
    <p v-if="latestPlace">Longitude: {{ latestPlace.location.lng }}</p>
    <p v-if="latestPlace">Timezone: {{ latestPlace.timezone }}</p>
    <p v-if="latestPlace">Local Time: {{ latestPlace.localTime }}</p>
  </div>
</template>


<script>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    export default {
        setup() {
        const store = useStore()
        const latestPlace = computed(() => store.getters.latestPlace)
        function getCurrentLocation() {
          store.dispatch('getCurrentLocation')
        }

        return {
          getCurrentLocation,
          latestPlace
      }
    }
  }
  </script>