const notes = require("../data/notes-data");

function getNoteById(noteId) {
  return notes.find((note) => note.id === Number(noteId));
}

function updateNoteById(noteId, updatedText) {
  const noteIndex = notes.findIndex((note) => note.id === Number(noteId));
  if (noteIndex !== -1) {
    notes[noteIndex].text = updatedText;
    return notes[noteIndex];
  }
  return null;
}

function deleteNoteById(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === Number(noteId));
  if (noteIndex !== -1) {
    return notes.splice(noteIndex, 1);
  }
  return null;
}

function list(_, res) {
    return res.json({data:notes});
}

function create(req, res) {
  const data = req.body.data;
  if (!data) {
    return res.status(400).json({ error: "Data is required" });
  }
  const text = data.text;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const newNote = {
    id: notes.length + 1,
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

function read(req, res) {
  const note = getNoteById(req.params.noteId);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json({ data: note });
}

function update(req, res) {
  const data = req.body.data;
  if (!data) {
    return res.status(400).json({ error: "Data is required" });
  }
  const text = data.text;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const updatedNote = updateNoteById(req.params.noteId, text);
  if (!updatedNote) {
    return res.status(404).json({ error: "Note not found" });
  }
  return res.json({ data:updatedNote });
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
