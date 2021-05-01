import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(id) {
    const note = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = note.data
  }

  async createNote(newNote, id) {
    await api.post('api/notes', newNote)
    this.getNotesByBugId(id)
  }
}

export const notesService = new NotesService()
