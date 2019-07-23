<template>
  <div>
    <section class="section>">
      <div class="container">
        <h1 class="title">Series Leaderboards</h1>
        <div class="columns">
          <div class="column is-half">
          <SeriesSearch></SeriesSearch>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import SeriesSearch from './series-search.vue'

export default {
  components: {
    SeriesSearch
  }
}
</script>
