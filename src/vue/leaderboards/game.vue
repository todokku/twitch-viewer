<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-3">{{game.name}}</h2>
      <Category
        v-for="category in game.categories"
        v-bind:category="category"
        v-bind:key="category.id"
      >
      </Category>
    </div>
  </section>
</template>
<script>
import Category from './category.vue'
export default {
  props: {
    game: Object
  },
  components: {
    Category
  }
}
</script>
