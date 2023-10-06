const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const { Note } = require('./schema');

const app = new express();

app.use(cors());
app.use(express.json());

// get all notes, filtered and paginated
app.get('/notes', (req, res) => {
    const { content, title, page = 1, size = 10 } = req.query;
    const query = {};
    if (content) { query.content = content }
    if (title) { query.title = title }

    Note.find(query)
        .skip((page - 1) * size)
        .limit(size)
        .then((list) => res.status(200).send(list))
        .catch((err) => {
            res.status(500).send('internal server error');
            console.log(`something went wrong while fetching notes\n${err}`)
        })
})

// create a new note
app.post('/notes', async (req, res) => {
    console.log(req.body)
    const { title, content, date } = req.body;

    const newNote = new Note({ title, content, date })
    newNote.save()
        .then(() => res.status(201).send('new note successfully added'))
        .catch((err) => {
            res.status(500).send('internal server error');
            console.log(`something went wrong while creating a note\n${err}`)
        });
})

// delete a note by its id
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findOneAndDelete({ id: id })
        .then(deleted => {
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

// update a note attributes (by id)
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

/**
 * connects the server to MongoDB
 */
const dbConnect = () => {
    mongoose.connect('mongodb://127.0.0.1/my-note-keeper')
        .then(() => console.log('Connceted to MongoDB'))
        .catch((err) => {
            console.log('An error occured while connecting to the Database\n', err);
            return;
        })
}