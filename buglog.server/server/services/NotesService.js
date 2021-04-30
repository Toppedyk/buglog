import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class NotesService {
  async getNotesByBugId(id) {
    return await dbContext.Notes.find(id).populate('creator', 'name picture')
  }

  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    return note
  }

  async deleteNote(id, userId) {
    const note = await dbContext.Notes.findById(id)
    if (note.creatorId !== userId) {
      throw new Forbidden('You Cannot delete another users Note')
    }
    await dbContext.Notes.findOneAndDelete(id)
    return 'Successfully Deleted'
  }
}
export const notesService = new NotesService()
