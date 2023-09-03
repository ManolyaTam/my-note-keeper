const { model, Schema } = require('mongoose');

const NoteSchema = new Schema({
    title: String,
    content: String,
    _date: String
})

const Note = model('notes', NoteSchema, 'noteCollection');

exports.Note = Note;