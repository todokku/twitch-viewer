<template>
  <li v-bind:class="itemClass">
    <a
      v-on:click="handleItemClick"
    >
      {{option.label}}
    </a>
  </li>
</template>
<script>
import LeaderboardsApi from '../api/Leaderboards.js'

export default {
  props: {
    option: Object,
    selectedValue: String,
    gameId: String,
    categoryId: String
  },
  computed: {
    itemClass(){
      if(this.selectedValue == this.option.value) {
        return "is-active";
      }
      else {
        return "";
      }
    },
  },
  methods: {
    handleItemClick() {
      var currentVariablesObject =
        this.$store.getters.view
        .map(g => g.categories)
        .flat()
        .find(c => { return c.id == this.categoryId})
        .values;

      var currentVariables = [];

      Object.keys(currentVariablesObject).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        var value = {
          id: key,
          value: currentVariablesObject[key]
        }

        currentVariables.push(value);
      });

      const updatedVariable = {
        id: this.option.variableId,
        value: this.option.value
      }

      var newVariables =
        currentVariables
        .filter(v => v.id != updatedVariable.id);

      newVariables.push(updatedVariable);

      LeaderboardsApi
      .getLeaderboard(this.gameId, this.categoryId, newVariables)
      .then(response => {
        this.$store.commit("UPDATE_LEADERBOARD", response)
      })
    }
  }
}
</script>
