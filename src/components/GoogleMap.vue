<template>
    <div>
      <button @click="getCurrentLocation">Get Current Location</button>
      <input v-model="searchLocation" @keyup.enter="search" />
      <button @click="search">Search</button>
      <GoogleMapLoader
        :map-config="mapConfig"
        api-key="your-google-api-key"
      >
        <GoogleMapMarker
          v-for="(m, index) in markers"
          :key="index"
          :marker="m"
          :clickable="true"
          @click="center=m.position"
        />
      </GoogleMapLoader>
      <table>
        <!-- Add your table rows here -->
      </table>
      <button @click="deleteSelected">Delete Selected</button>
    </div>
  </template>
  
<script>
  import { GoogleMapLoader, GoogleMapMarker } from 'vue3-google-map';
  import { useStore } from 'vuex';
  
  export default {
    components: {
      GoogleMapLoader,
      GoogleMapMarker,
    },
    data() {
      return {
        searchLocation: '',
      };
    },
    computed: {
      store() {
        return useStore();
      },
      markers() {
        return this.store.getters.paginatedPlaces;
      },
      mapConfig() {
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
  