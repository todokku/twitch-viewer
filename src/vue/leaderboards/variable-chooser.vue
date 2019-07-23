<template>
  <nav class="panel">
    <VariableOption
      v-for="option in options"
      v-bind:option="option"
      v-bind:key="option.id"
    >
    </VariableOption>
  </nav>
</template>
<script>
import VariableOption from './variable-option.vue'
export default {
  props: {
    variable: Object
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
          variableId: self.variable.id
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
