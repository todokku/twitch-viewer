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
    categoryId: String
  },
  computed: {
    itemClass(){
      if(this.option.selected) {
        return "is-active";
      }
      else {
        return "";
      }
    },
  },
  methods: {
    handleItemClick() {
      let newVariableSelection = {
        id: this.option.variableId,
        value: this.option.value,
        categoryId: this.categoryId
      }

      this.$store.dispatch("UPDATE_GAME_VARIABLES", newVariableSelection);
    }
  }
}
</script>
