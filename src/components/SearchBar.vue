<template>
    <div>
      <input type="text" v-model="searchText" placeholder="Enter location name" @keyup.enter="searchLocation">
      <button @click="searchLocation">Search</button>
    </div>
</template>
  
  <script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  export default {
    setup() {
      const store = useStore()
      const searchText = ref('')
      
      function searchLocation() {
        store.dispatch('searchLocation', searchText.value)
        searchText.value = ''
      }
      
      return {
        searchText,
        searchLocation
      }
    }
  }
  </script>
  