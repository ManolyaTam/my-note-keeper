const { model, Schema } = require('mongoose');

const NoteSchema = new Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: Date,
})

const Note = model('notes', NoteSchema, 'noteCollection');

exports.Note = Note;