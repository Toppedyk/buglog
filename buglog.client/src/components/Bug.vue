<template>
  <tr class="Bug">
    <th scope="row">
      {{ bug.title }}
    </th>
    <td>{{ bug.creator.name }}</td>
    <td>status</td>
    <td>last modified</td>
  </tr>
</template>

<script>
export default {
  name: 'Bug',
  props: {
    bug: {
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
