import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    AppState.bugs.push(res.data)
    logger.log(res.data)
  }
}

export const bugsService = new BugsService()
