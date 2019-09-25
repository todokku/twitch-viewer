<template>
  <a
    class="panel-block"
    v-on:click="handleClick"
  >
    {{stream.user_name}}
  </a>
</template>
<script>
export default {
  props: {
    stream: Object
  },
  methods: {
    handleClick() {
      this.$store.dispatch("SELECT_STREAM", this.stream);
    }
  }
}
</script>
