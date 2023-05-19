<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <div>
      <CurrentLocation />
    </div>
    <div>
      <SearchBar />
    </div>
    <div>
      <PlacesTable />
    </div>
    <div>
      <LeafletMap />
    </div>
    <!-- <GoogleMap /> -->
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import PlacesTable from './components/PlacesTable.vue'
import CurrentLocation from './components/CurrentLocation.vue';
import LeafletMap from './components/LeafletMap.vue'
//import GoogleMap from './components/GoogleMap.vue';
export default {
  components: {
    SearchBar,
    PlacesTable,
    CurrentLocation,
    LeafletMap,
    //GoogleMap
  }
}
</script>

<style>
</style>
