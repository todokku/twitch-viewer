<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{category.name}}</p>
    </header>
    <div class="card-content">
      <VariableChooser
        v-for="variable in category.variables.data"
        v-bind:variable="variable"
        v-bind:key="variable.category"
        v-bind:game-id="category.game"
        v-bind:category-id="category.category"
        v-bind:values="category.values"
      >
      </VariableChooser>
      <Runs
        v-bind:runs="this.category.runs"
      >
      </Runs>
    </div>
  </div>
</template>
<script>

  import VariableChooser from './variable-chooser.vue'
  import Runs from './runs.vue'

  export default {
    props: {
      category: Object
    },
    components: {
      Runs,
      VariableChooser
    }
  }
</script>
