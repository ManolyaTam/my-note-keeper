const mongoose = require('mongoose');
const express = require('express');
const app = new express();

app.get('/notes', (req, res) => {
    res.send('Retrieving all notes')
})

app.post('/notes', (req, res) => {
    res.send('Adding a new note')
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