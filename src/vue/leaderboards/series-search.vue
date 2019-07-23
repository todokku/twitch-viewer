<template>
  <div>
    <form id="form">
      <div class="field is-grouped">
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="seriesQuery"
            placeholder="Series"
          >
        </div>
        <div class="control">
          <input
            type="submit"
            class="button is-link"
            value="Find Series"
            v-on:click.prevent="handleSeriesClick"
          />
        </div>
      </div>
    </form>
    <nav class="panel">
      <SeriesSearchResult
        v-for="series in searchResults"
        v-bind:key="series.id"
        v-bind:series="series"
      >
      </SeriesSearchResult>
    </nav>
  </div>
</template>
<script>
  import SeriesApi from '../api/Series.js'
  import SeriesSearchResult from './series-search-result.vue'

  export default {
    data() {
      return {
        seriesQuery: '',
        searchResults: []
      }
    },
    methods: {
      handleSeriesClick(){
        SeriesApi.searchSeries(this.seriesQuery)
        .then(response => {
          this.searchResults = response.data;
        })
      }
    },
    components: {
      SeriesSearchResult
    }
  }
</script>
