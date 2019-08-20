<template>
  <div>
    <Category
      v-for="category in runs"
      v-bind:category="category"
      v-bind:key="category[0]"
    >
    </Category>
  </div>
</template>
<script>
import Category from './category.vue'
export default {
  computed: {
    runs() {
      return this.$store.state.runs;
    }
  },
  components: {
    Category
  }
}
</script>
