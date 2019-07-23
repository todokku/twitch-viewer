<template>
  <li v-bind:class="itemClass">
    <a>{{option.label}}</a>
  </li>
</template>
<script>
export default {
  props: {
    option: Object,
    selectedValue: String
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
  }
}
</script>
