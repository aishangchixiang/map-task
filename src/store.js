import { createStore } from 'vuex'
import * as moment from 'moment-timezone'
import config from '../config'

export default createStore({
  state: {
    currentPlace: {
      id: `0,0`,
      name: `Lat: 0.0, Lng: 0.0`,
      location: { 
        lat: 0, 
        lng: 0
      },
      timezone: 0,
      localTime: 0
    },
    places: [],
    mapCenter: { lat: 0, lng: 0 },
    page: 1
  },
  getters: {
    currentLocation: state => {
      return state.currentPlace
    },
    latestPlace: state => {
      return state.places[state.places.length - 1] || null
    },
    paginatedPlaces: state => {
      // Implement pagination logic here
      let start = (state.page - 1)*10
      let end = start + 10
      return state.places.slice(start, end)
    },
    maxPage: state => {
      // Calculate max page number here
      return Math.ceil(state.places.length / 10)
    }
  },
  mutations: {
    ADD_PLACE(state, place) {
      state.places.push(place)
    },
    SET_MAP_CENTER(state, location) {
      state.mapCenter = location
    },
    REMOVE_SELECTED(state) {
      state.places = state.places.filter(place => !place.selected)
    },
    SELECT_ALL(state, selectAll) {
      state.places.forEach(place => {
        place.selected = selectAll
      })
    },
    SET_PAGE(state, newPage) {
      state.page = newPage
    },
    SET_CURRENT_PLACE(state, currentPlace){
      state.currentPlace = currentPlace
    }
  },
  actions: {
    async getCurrentLocation( context ) {
      // Implement geolocation API here and commit ADD_PLACE and SET_MAP_CENTER mutations
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            // Use the latitude and longitude to get timezone
            const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=1331161200&key=${config.googleApiKey}`)
            const data = await response.json()

            const timezone = data.timeZoneId
            const localTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')

            const place = {
                id: `${lat},${lng}`,
                name: `Lat: ${lat}, Lng: ${lng}`,
                location: { lat, lng },
                timezone,
                localTime
              }
            context.commit('SET_CURRENT_PLACE', place)
            context.commit('ADD_PLACE', place)
            context.commit('SET_MAP_CENTER', { lat, lng })
        })
    } else {
            alert('Geolocation is not supported by this browser.')
        }
    },
    async searchLocation(context, locationName) {
      // Implement location search API here and commit ADD_PLACE and SET_MAP_CENTER mutations
      // Use Google Places API to search for the location
        // The exact API URL and parameters depend on the specific API you are using
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${config.googleApiKey}`)
        const data = await response.json()

        if (data.status === "OK" && data.results && data.results.length > 0) {
            const lat = data.results[0].geometry.location.lat
            const lng = data.results[0].geometry.location.lng

            // Use the latitude and longitude to get timezone
            const timezoneResponse = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=1331161200&key=${config.googleApiKey}`)
            const timezoneData = await timezoneResponse.json()

            const timezone = timezoneData.timeZoneId
            const localTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')

            const place = {
                id: `${lat},${lng}`,
                name: locationName,
                location: { lat, lng },
                timezone,
                localTime
            }

            context.commit('ADD_PLACE', place)
            context.commit('SET_MAP_CENTER', { lat, lng })
        } else {
            alert('No location found')
        }

    },
    deleteSelected({ commit }) {
      commit('REMOVE_SELECTED')
    },
    toggleSelectAll({ commit, state }) {
      commit('SELECT_ALL', !state.selectAll)
    },
    nextPage({ commit, state, getters }) {
      // Implement next page action here
      if (state.page < getters.maxPage) {
        commit('SET_PAGE', state.page + 1)
    }
    },
    previousPage({ commit, state }) {
      // Implement previous page action here
      if(state.page > 1){
        commit('SET_PAGE', state.page - 1)
      }
    }
  }
})
