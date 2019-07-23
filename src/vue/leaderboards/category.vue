<template>
  <div>
    <h3 class="title is-4">{{category.name}}</h3>
    <table class="table is-striped">
      <tbody>

      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      category: Object
    }
  }
</script>
