const mongoose = require('mongoose');
const express = require('express');
const { Note } = require('./schema');
const app = new express();

app.use(express.json());

app.get('/notes', (req, res) => {
    const query = req.query;
    Note.find(query)
        .then((list) => res.status(200).send(list))
        .catch((err) => {
            res.status(500).send('internal server error');
            console.log(`something went wrong while fetching notes\n${err}`)
        })
})

app.post('/notes', async (req, res) => {
    const { id, title, content, date } = req.body;
    const found = await Note.find({ id });
    if (found.length) {
        console.log(found);
        res.status(400).send('id already exists');
        return;
    }

    const newNote = new Note({ id, title, content, date })
    newNote.save()
        .then(() => res.status(201).send('new note successfully added'))
        .catch((err) => {
            res.status(500).send('internal server error');
            console.log(`something went wrong while creating a note\n${err}`)
        });
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findOneAndDelete({ id: id })
        .then(deleted => {
            console.log(`deleted: ${deleted}`);
            if (deleted) {
                res.status(200).end();
            } else {
                res.status(404).send('note does not exist');
            }
        })
        .catch((err) => {
            console.log('something went wrong while deleting a note\n', err);
            res.status(500).send('internal server error');
        })
})

app.put('/notes/:id', async (req, res) => {
    const filterId = req.params.id;
    const { _id, id, ...updateObj } = req.body;
    Note.findOneAndUpdate({ id: filterId }, updateObj)
        .then((found) => {
            if (!found) {
                res.status(404).send('note does not exist')
            }
            else {
                res.status(200).send('note successfully updated')
            }
        })
        .catch((err => {
            console.log(`something went wrong while updating a note\n${err}`)
            res.status(500).send('internal server error');
        }))
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