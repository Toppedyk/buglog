<template>
  <div class="home flex-grow-1 container-fluid">
    <div class="row mt-3 title-row">
      <div class="col-12 col-lg-6 d-flex justify-content-center mb-2">
        <div class="d-flex align-items-end">
          <h1 class="mb-0">
            Current Bugs
          </h1>
          <button type="button" class="btn btn-dark ml-4" data-toggle="modal" data-target="#ReportBugModal">
            Report
          </button>
          <ReportBugModal />
        </div>
      </div>
      <div class="col-12 col-lg-6 d-flex justify-content-center align-items-end mb-2">
        <div class="d-flex align-items-baseline">
          <input type="checkbox" @change="filterBugs" v-if="state.elem === true" class="checkbox">
          <input type="checkbox" @change="filterBugs" v-else checked class="checkbox">
          <p class="m-0 ml-2">
            Hide Closed
          </p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-md-10 d-flex">
        <table class="mb-5 mt-3 table table-dark table-sm table-responsive-sm table-striped table-hover my-table">
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
import Notification from '../utils/Notification'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      elem: true,
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
      state,
      async filterBugs() {
        try {
          if (state.elem === true) {
            await bugsService.filterBugs()
            state.elem = false
          } else {
            await bugsService.getAllBugs()
            state.elem = true
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  background-color: rgb(14, 0, 48);
  color: rgb(221, 221, 221);
}

@media(max-width: 600px){
h1{
  font-size: 2rem;
}

}
.title-row{
  border-bottom: 1px solid white;
}

.my-table{
  border-left: 1px solid white;
  border-right: 1px solid white;
}

.checkbox{
  cursor: pointer;
}
</style>
