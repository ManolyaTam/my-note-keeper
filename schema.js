const { model, Schema } = require('mongoose');

const NoteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    date: { type: Date },
    color: { type: String }
})

const Note = model('notes', NoteSchema, 'noteCollection');

exports.Note = Note;