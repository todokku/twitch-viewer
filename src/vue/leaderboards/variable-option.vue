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
    }
  },
  methods: {
    handleItemClick() {
      const variable = {
        id: this.option.variableId,
        value: this.option.value
      }

      LeaderboardsApi
      .getLeaderboard(this.gameId, this.categoryId, variable)
      .then(response => {
        this.$store.commit("UPDATE_LEADERBOARD", response)
      })
    }
  }
}
</script>
