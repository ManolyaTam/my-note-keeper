const express = require("express");
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

app.listen(3001, () => console.log('listening on port 3001'))