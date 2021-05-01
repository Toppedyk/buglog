<template>
  <tr class="Bug" @click="bugDetails">
    <th scope="row">
      {{ bug.title }}
    </th>
    <td>{{ bug.creator.name }}</td>
    <td>
      <p v-if="bug.closed==false">
        <span>Open</span>
      </p>
      <p v-else>
        <span>Closed</span>
      </p>
    </td>
    <td>last modified</td>
  </tr>
</template>

<script>
import { useRouter } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      bugDetails() {
        try {
          router.push({ name: 'BugDetailsPage', params: { id: props.bug.id } })
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
