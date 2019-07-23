<template>
  <div>
    <h3 class="title is-4">{{category.name}}</h3>
    <VariableChooser
      v-for="variable in category.variables"
      v-bind:variable="variable"
      v-bind:key="variable.id"
    >
    </VariableChooser>
    <table class="table is-striped">
      <tbody>
        <Run
          v-for="run in category.runs"
          v-bind:run="run"
          v-bind:key="run.id"
        >
        </Run>
      </tbody>
    </table>
  </div>
</template>
<script>
  import Run from './run.vue'
  import VariableChooser from './variable-chooser.vue'

  export default {
    props: {
      category: Object
    },
    components: {
      Run,
      VariableChooser
    }
  }
</script>
