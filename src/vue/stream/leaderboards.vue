<template>
  <div>
    <Category
      v-for="category in leaderboards"
      v-bind:category="category"
      v-bind:key="category.id"
    >
    </Category>
  </div>
</template>
<script>
import Category from './category.vue'
export default {
  computed: {
    leaderboards() {
      //return this.$store.getters.leaderboardCategories;
      return this.$store.state.leaderboards.map(x => x.data).flat();
    }
  },
  components: {
    Category
  }
}
</script>
