<template>
    <l-map 
      style="height: 80vh; width: 100%;" 
      :center="mapCenter" 
      :zoom="13" 
      :options="{ dragging: true, zoomControl: false }"
      @update:center="updateCenter">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker v-for="place in places" :key="place.id" :lat-lng="place.location"></l-marker>
    </l-map>
  </template>
  
  <script>
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    setup() {
      const store = useStore()
  
      const places = computed(() => store.state.places)
      const mapCenter = computed(() => store.state.mapCenter)
  
      const updateCenter = (newCenter) => {
        store.commit('SET_MAP_CENTER', newCenter)
      }
  
      return { 
            places, 
            mapCenter, 
            updateCenter 
        }
    }
  }
  </script>
  
  