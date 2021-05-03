<template>
  <div v-if="state.loading===true">
    Loading...
  </div>
  <div class="BugDetailsPage container-fluid" v-else>
    <div class="row">
      <div class="col-lg-6 col-12 d-flex flex-column mt-3">
        <div class="d-flex align-items-center">
          <h1 v-if="state.edit===false">
            {{ state.activeBug.title }}
          </h1>
          <input type="text" v-model="state.newBug.title" v-else placeholder="New Description...">
        </div>
        <div class="d-flex align-items-center mt-2">
          <p>Reported By: <img :src="state.activeBug.creator.picture" alt="Creators picture" class="rounded-circle small-img"> <span>{{ state.activeBug.creator.name }}</span></p>
        </div>
      </div>
      <div class="col-xl-6 col-12 mt-4">
        <div v-if="state.activeBug.creator.id === state.account.id">
          <button type="button" class="btn btn-danger" @click="deleteBug" v-if="state.activeBug.closed==false">
            Close
          </button>
          <i class="fas fa-edit ml-3" v-if="state.activeBug.creator.id === state.account.id & state.activeBug.closed==false " @click="state.edit = true"> Edit Bug</i>
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
        <p v-if="state.edit===false">
          {{ state.activeBug.description }}
        </p>
        <input type="text" class="my-2 w-100" v-model="state.newBug.description" v-else placeholder="New Description...">
      </div>
    </div>
    <div class="row">
      <div class="col mt-3 d-flex justify-content-center">
        <div v-if="state.edit === true">
          <button type="button" class="btn btn-danger" @click="state.edit= false">
            Cancel
          </button>
          <button type="button" class="btn btn-success ml-3" @click="editBug">
            Save Changes
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col d-flex">
        <h3>Notes</h3>
        <button type="button" class="btn btn-success ml-4" data-toggle="modal" data-target="#CommentModal" v-if="state.user.isAuthenticated & state.activeBug.closed==false">
          Add
        </button>
        <CommentModal />
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-10 d-flex">
        <table class="table table-sm table-responsive-sm table-striped">
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
      edit: false,
      newNote: {},
      newBug: {},
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
      async editBug() {
        try {
          state.newBug.id = state.activeBug.id
          await bugsService.editBug(state.newBug)
          state.newBug = {}
          state.edit = false
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
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
@media(max-width: 600px){
h1{
  font-size: 2rem;
}

h3{
  font-size: 1rem;
}
}
</style>
