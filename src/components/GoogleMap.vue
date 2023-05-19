<template>
    <div>
      <GoogleMap
        :center="mapCenter"
        :zoom="10"
        api-key="AIzaSyCA_zzRd9YSUcNFv-wrUUW6DSWEJCFL7HQ"
      >
        <Marker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          @click="mapCenter=m.position"
        />
      </GoogleMap>
    </div>
  </template>
  
<script>
  import { GoogleMap, Marker } from 'vue3-google-map';
  import { useStore } from 'vuex';
  
  export default {
    components: {
      GoogleMap,
      Marker,
    },
    computed: {
      store() {
        return useStore();
      },
      markers() {
        return this.store.getters.paginatedPlaces;
      },
      mapCenter() {
        return {
          center: this.store.getters.latestPlace?.location || { lat: 0, lng: 0 },
          zoom: 4,
        };
      },
    },
    methods: {
      getCurrentLocation() {
        this.store.dispatch('getCurrentLocation');
      },
      search() {
        this.store.dispatch('searchLocation', this.searchLocation);
        this.searchLocation = '';
      },
      deleteSelected() {
        this.store.dispatch('deleteSelected');
      },
    },
  };
  </script>
  