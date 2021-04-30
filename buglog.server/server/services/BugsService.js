import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async getAllBugs(query = {}) {
    const bugs = await dbContext.Bugs.populate('creator', 'name picture')
    return bugs
  }

  async getBugById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async createBug(body) {
    const bug = await dbContext.Bugs.create(body)
    return bug
  }

  async editBug(body) {
    const found = await this.getBugById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new Forbidden('You Cannot edit another users Bug')
    }
    if (found.closed === true) {
      throw new Forbidden('You Cannot edit a closed Bug')
    }
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return bug
  }

  async deleteBug(id, userId) {
    const bug = await this.getBugById(id)
    if (bug.creatorId !== userId) {
      throw new Forbidden('You Cannot delete another users Bug')
    }
    await this.editBug({ _id: id, creatorId: userId }, { closed: true }, { new: true })
    return 'Successfully Closed'
  }
}
export const bugsService = new BugsService()
