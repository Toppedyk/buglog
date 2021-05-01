<template>
  <tr class="Note">
    <th scope="row">
      {{ note.creator.name }}
    </th>
    <td>{{ note.body }}</td>
    <td>
      <i class="fa fa-trash"></i>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
