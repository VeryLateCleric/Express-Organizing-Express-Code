const notes = require("../data/notes-data");

  function getNoteById(noteId) {
    return notes.find(note => note.id === Number(noteId));
  }

  
  function updateNoteById(noteId, updatedText) {
    const noteIndex = notes.findIndex(note => note.id === Number(noteId));
    if (noteIndex !== -1) {
      notes[noteIndex].text = updatedText;
      return notes[noteIndex];
    }
    return null;
  }
  
  function deleteNoteById(noteId) {
    const noteIndex = notes.findIndex(note => note.id === Number(noteId));
    if (noteIndex !== -1) {
      return notes.splice(noteIndex, 1);
    }
    return null;
  }

function list(req, res) {
  res.json(notes);
}

function create(req, res) {
  const { text } = req.body.data;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const newNote = {
    id: getNotes().length + 1,
    text,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
}

function read(req, res) {
  const note = getNoteById(req.params.noteId);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json(note);
}

function update(req, res) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const updateNote = updateNoteById(req.params.noteId, text);
  if (!updatedNote) {
    return res.status(404).json({ error: "Note not found" });
  }
}

function destroy(req, res) {
  const note = getNoteById(req.params.noteId);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  deleteNoteById(req.params.noteId);
  res.status(204).end();
}

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy,
};
