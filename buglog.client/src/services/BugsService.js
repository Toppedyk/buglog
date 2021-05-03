import { AppState } from '../AppState'
import { api } from './AxiosService'
import router from '../router.js'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.reverse()
  }

  async filterBugs() {
    AppState.bugs = AppState.bugs.filter(b => b.closed === false)
  }

  async getBugById(id) {
    const bug = await api.get(`api/bugs/${id}`)
    AppState.activeBug = bug.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    this.getAllBugs()
    router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
  }

  async deleteBug(id) {
    await api.delete(`api/bugs/${id}`)
    this.getBugById(id)
    this.getAllBugs()
  }

  async editBug(newBug) {
    delete newBug.closed
    await api.put(`api/bugs/${newBug.id}`, newBug)
    this.getBugById(newBug.id)
  }
}

export const bugsService = new BugsService()
