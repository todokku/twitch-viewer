<template>
  <div class="tabs">
    <ul>
      <VariableOption
        v-for="option in variable.values"
        v-bind:option="option"
        v-bind:key="option.id"
        v-bind:category-id="categoryId"
      >
      </VariableOption>
    </ul>
  </div>
</template>
<script>
import VariableOption from './variable-option.vue'
export default {
  props: {
    variable: Object,
    categoryId: String,
  },
  components: {
    VariableOption
  }
}
</script>
