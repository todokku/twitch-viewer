<template>
  <tr>
    <td>
      {{record.date}}
    </td>
    <td>
      {{record.game}}
    </td>
    <td>
      {{record.category}}
    </td>
    <td>
      {{record.player}}
    </td>
    <td style="text-align: right;">
      {{record.time}}
    </td>
    <td>
      <a v-bind:href="record.link">
        Link
      </a>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    record: Object
  }
}
</script>
