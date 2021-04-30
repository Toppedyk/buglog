<template>
  <div class="home flex-grow-1 container-fluid">
    <div class="row mt-3">
      <div class="col-6">
        <div class="d-flex align-items-end">
          <h1 class="mb-0">
            Current Bugs
          </h1>
          <button type="button" class="btn btn-dark ml-2" data-toggle="modal" data-target="#ReportBugModal">
            Report
          </button>
          <ReportBugModal />
        </div>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-end">
        <div class="d-flex align-items-baseline">
          <input type="checkbox">
          <p>Hide Closed</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-10 d-flex ">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Reported By
              </th>
              <th scope="col">
                Status
              </th>
              <th scope="col">
                Last Modified
              </th>
            </tr>
          </thead>
          <tbody>
            <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">

</style>
