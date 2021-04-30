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
            <tr>
              <th scope="row">
                1
              </th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">

</style>
