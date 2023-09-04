const mongoose = require('mongoose');
const express = require('express');
const { Note } = require('./schema');
const app = new express();

app.use(express.json());

app.get('/notes', (req, res) => {
    Note.find()
        .then((list) => res.status(200).send(list))
        .catch((err) => {
            res.status(500).send('sorry, something went wrong');
            console.log(`something went wrong while fetching notes\n${err}`)
        })
})

app.post('/notes', async (req, res) => {
    const { id, title, content, date } = req.body;
    const found = await Note.find({ id: id });
    if (found.length) {
        console.log(found);
        res.status(400).send('id already exists');
        return;
    }

    const newNote = new Note({ id, title, content, date })
    newNote.save()
        .then(() => res.status(201).send('new note successfully added'))
        .catch((err) => {
            res.status(500).send('sorry, something went wrong');
            console.log(`something went wrong while creating a note\n${err}`)
        });
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findOneAndDelete({ id })
        .then(deleted => {
            if (deleted) {
                res.status()
            } else {
                res.status('')
            }
        })
    res.send(`deleting note #${id}`)
})

app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
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