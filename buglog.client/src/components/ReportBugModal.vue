<template>
  <div class="ReportBugModal">
    <div class="modal" id="ReportBugModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              ReportBug
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createBug">
              <div class="d-flex">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Title</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title..." v-model="state.newBug.title">
                </div>
                <div class="form-group ml-5">
                  <label for="user name">Reported By</label>
                  <h5>{{ state.user.name }}</h5>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Your Description Here..." v-model="state.newBug.description"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
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
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'
import $ from 'jquery'
export default {
  name: 'ReportBugModal',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      newBug: {}
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          Notification.toast('Successfully Created', 'success')
          state.newBug = {}
          $('#ReportBugModal').modal('hide')
        } catch (error) {
          Notification.toast('Error' + error, 'error')
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
