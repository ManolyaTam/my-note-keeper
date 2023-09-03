const mongoose = require('mongoose');
const express = require('express');
const { Note } = require('./schema');
const app = new express();

app.use(express.json());

app.get('/notes', (req, res) => {
    res.send('Retrieving all notes')
})

app.post('/notes', (req, res) => {
    const { title, content, _date } = req.body;
    const newNote = new Note({ title, content, _date })
    newNote.save()
        .then(() => res.send('new note successfully added'))
        .catch((err) => {
            res.send('sorry, something went wrong');
            console.log(`something went wrong while creating a note\n${err}`)
        });
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    res.send(`deleting note #${id}`)
})

app.put('/notes/:id', (req, res) => {
    const id = req.params.id
    res.send(`updating note #${id}`)
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
    dbConnect();
})

const dbConnect = () => {
    mongoose.connect('mongodb://127.0.0.1/my-note-keeper')
        .then(() => console.log('Connceted to MongoDB'))
        .catch((err) => {
            console.log('An error occured while connecting to the Database\n', err);
            return;
        })
}