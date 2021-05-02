<template>
  <div v-if="state.loading===true">
    Loading...
  </div>
  <div class="BugDetailsPage container-fluid" v-else>
    <div class="row">
      <div class="col-6 d-flex flex-column">
        <h1>{{ state.activeBug.title }}</h1>
        <p>Reported By: <img :src="state.activeBug.creator.picture" alt="Creators picture" class="rounded-circle small-img"> <span>{{ state.activeBug.creator.name }}</span></p>
      </div>
      <div class="col-6">
        <div v-if="state.activeBug.creator.id === state.account.id">
          <button type="button" class="btn btn-danger" @click="deleteBug" v-if="state.activeBug.closed==false">
            Close
          </button>
        </div>
        <p v-if="state.activeBug.closed==false">
          Status: <span class="open">Open</span>
        </p>
        <p v-else>
          Status: <span class="closed">Closed</span>
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 border">
        <p>{{ state.activeBug.description }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex">
        <h3>Notes</h3>
        <button type="button" class="btn btn-success ml-4" data-toggle="modal" data-target="#CommentModal" v-if="state.user.isAuthenticated">
          Add
        </button>
        <CommentModal />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Message
              </th>
              <th scope="col">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <Note v-for="note in state.notes" :key="note.id" :note="note" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newNote: {},
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        await notesService.getNotesByBugId(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async deleteBug() {
        try {
          const del = confirm('Are you sure you want to close this? This cannot be undone!')
          if (del === true) {
            bugsService.deleteBug(route.params.id)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
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
