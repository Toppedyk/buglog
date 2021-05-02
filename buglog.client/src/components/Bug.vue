<template>
  <tr class="Bug" @click="bugDetails">
    <th scope="row">
      {{ bug.title }}
    </th>
    <td><img :src="bug.creator.picture" alt="creator image" class="rounded-circle small-img">{{ bug.creator.name }}</td>
    <td>
      <p v-if="bug.closed==false">
        <span class="open">Open</span>
      </p>
      <p v-else>
        <span class="closed">Closed</span>
      </p>
    </td>
    <td>
      {{ new Date(bug.updatedAt).toLocaleString("en",options) }}
    </td>
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
      options: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
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
.open{
  color: green
}
.closed{
  color:red;
}

.small-img{
  object-fit: cover;
  max-height: 2rem;
}

</style>
