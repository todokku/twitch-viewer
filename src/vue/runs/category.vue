<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-3">{{category[0]}}</h2>
      <VariableChooser
        v-for="variable in categoryVariables"
        v-bind:variable="variable"
        v-bind:key="variable.id"
        v-bind:game-id="1"
        v-bind:category-id="categoryId"
        v-bind:values="1"
      >
      </VariableChooser>
      <table class='table is-narrow is-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <RunRow
            v-for="run in runs"
            v-bind:key="run.id"
            v-bind:run="run"
          >
          </RunRow>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>

import RunRow from './run-row.vue'
import VariableChooser from './variable-chooser.vue'
export default{
  props: {
    category: Array,
    variables: Array
  },
  components: {
    RunRow,
    VariableChooser
  },
  computed: {
    runs() {
      let unfilteredRuns = this.category[1];
      if(unfilteredRuns.length < 1) {
        return [];
      }

      //filter the runs by variables
      let categoryId = unfilteredRuns[0].category.data.id;
      let categoryVariables = this.variables
      .filter(v =>
        v.category == categoryId ||
        (v.category == null && v["is-subcategory"] == true) //some variables are game global
      );

      //don't filter if there are no category variables
      if(categoryVariables.length < 1){
        return unfilteredRuns;
      }
      else {
        let filteredRuns = [];
        let selectedCategoryValues = [];

        categoryVariables.forEach(v => {
          let keys = Object.keys(v.values.values);
          keys.forEach(k => {
            if(v.values.values[k].selected){
              v.values.values[k].value = k;
              selectedCategoryValues.push(v.values.values[k]);
            }
          });
        })

        unfilteredRuns.forEach(r => {
            let runValues = r.values;
            let runKeys = Object.keys(runValues);

            runKeys.forEach(k => {
              var match =
                selectedCategoryValues
                .filter(x => x.value == runValues[k]);

              if(match.length > 0) {
                filteredRuns.push(r);
              }

            })
          });

        return filteredRuns;
      }
      // else {
      //   let filteredRuns = [];
      //   unfilteredRuns.forEach(r => {
      //     let runValues = runs.values;
      //     let selectedCategoryValues =
      //       this.categoryVariables
      //       .values.values
      //       .filter(v => v.selected);
      //
      //     console.log(runValues);
      //     console.log(selectedCategoryValues);
      //   });
      //
      //   return unfilteredRuns;
      // }
    },
    categoryId(){
      if(this.runs.length < 1) {
        return null;
      }
      else {
        return this.runs[0].category.data.id;
      }
    },
    categoryVariables() {
      return this.variables
      .filter(v =>
        v.category == this.categoryId ||
        (v.category == null && v["is-subcategory"] == true) //some variables are game global
      );
    }
  }
}
</script>
