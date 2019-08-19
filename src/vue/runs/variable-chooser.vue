<template>
  <div class="tabs">
    <ul>
      <VariableOption
        v-for="option in options"
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
    gameId: String,
    categoryId: String,
    values: Object
  },
  computed: {
    options() {
      var valuesObj = this.variable.values.values;
      var options = [];
      var self = this;

      Object.keys(valuesObj).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        var option = {
          value: key,
          label: valuesObj[key].label,
          variableId: self.variable.id,
          selected: valuesObj[key].selected
        }

        options.push(option);
      });

      return options;
    }
  },

  components: {
    VariableOption
  }
}
</script>
