<template>
  <div>
    <CurrentLocation />
    <SearchBar />
    <PlacesTable />
    <LeafletMap />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import PlacesTable from './components/PlacesTable.vue'
import CurrentLocation from './components/CurrentLocation.vue';
import LeafletMap from './components/LeafletMap.vue'
export default {
  components: {
    SearchBar,
    PlacesTable,
    CurrentLocation,
    LeafletMap
  }
}
</script>

<style>
</style>
