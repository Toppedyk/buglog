import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
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
    AppState.bugs.push(res.data)
  }

  async deleteBug(id) {
    await api.delete(`api/bugs/${id}`)
    this.getBugById(id)
    this.getAllBugs()
  }
}

export const bugsService = new BugsService()
