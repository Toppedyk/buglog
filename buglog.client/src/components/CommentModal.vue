<template>
  <div class="CommentModal">
    <div class="modal" id="CommentModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add Comment
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNote">
              <div class="d-flex">
                <div class="form-group ml-5">
                  <label for="user name">Reported By</label>
                  <h5>{{ state.user.name }}</h5>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Comment</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Your Description Here..." v-model="state.newNote.body"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'CommentModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          state.newNote.bug = route.params.id
          await notesService.createNote(state.newNote, route.params.id)
          state.newNote = {}
          $('#CommentModal').modal('hide')
          Notification.toast('Succesfully created', 'success')
        } catch (error) {
          Notification.error('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
*{
  color: black
}
</style>
