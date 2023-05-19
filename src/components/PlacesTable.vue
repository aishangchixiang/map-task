<template>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="toggleSelectAll"></th>
          <th>name</th>
          <th>location</th>
          <th>timezone</th>
          <th>localTime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in places" :key="place.id">
          <td><input type="checkbox" v-model="place.selected"></td>
          <td>{{ place.name}}</td>
          <td>{{ place.location}}</td>
          <td>{{ place.timezone }}</td>
          <td>{{ place.localTime }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="deleteSelected">Delete Selected</button>
    <button @click="nextPage" :disabled="page >= maxPage">Next Page</button>
    <button @click="previousPage" :disabled="page <= 1">Previous Page</button>
</template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    setup() {
      const store = useStore()
      
      function deleteSelected() {
        store.dispatch('deleteSelected')
      }
      
      function toggleSelectAll() {
        store.dispatch('toggleSelectAll')
      }
      
      function nextPage() {
        store.dispatch('nextPage')
      }
      
      function previousPage() {
        store.dispatch('previousPage')
      }
      
      const places = computed(() => store.getters.paginatedPlaces)
      const page = computed(() => store.state.page)
      const maxPage = computed(() => store.getters.maxPage)
      
      return {
        deleteSelected,
        toggleSelectAll,
        nextPage,
        previousPage,
        places,
        page,
        maxPage
      }
    }
  }
  </script>
  