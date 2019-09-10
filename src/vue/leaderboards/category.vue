<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{category.name}}</p>
    </header>
    <div class="card-content">
      <VariableChooser
        v-for="variable in category.variables"
        v-bind:variable="variable"
        v-bind:key="variable.id"
        v-bind:game-id="category.gameId"
        v-bind:category-id="category.id"
        v-bind:values="category.values"
      >
      </VariableChooser>
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
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
