<template>
  <tr class="Note">
    <th scope="row">
      {{ note.creator.name }}
    </th>
    <td>{{ note.body }}</td>
    <td>
      <i class="fa fa-trash" @click="deleteNote"> Delete</i>
    </td>
  </tr>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { notesService } from '../services/NotesService'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteNote() {
        try {
          await notesService.deleteNote(props.note.id, props.note.bug)
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
