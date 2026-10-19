const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('crypto');

const tasksData = path.join(
    __dirname,
    'data/tasks.json'
);

const app = express();
const PORT = process.env.PORT || 3000;

//så Express vil læse requestens JSON og placere resultatet i req.body
app.use(express.json());

app.get('/', (req, res) =>  {
    res.status(200).send('Velkommen til to-do listen');
})

app.get('/api/tasks', async (req, res) => {
    try {
        const taskData = await fs.readFile(
            tasksData,
            'utf8'
        );
        const tasks = JSON.parse(taskData);

        res.status(200).send(tasks); //TODO - måske skal det laves med JSON.stringify(tasks)
    } catch (error) {
        console.log(error);
        res.status(500).send('Der opstod en fejl ved hentning af to-do listen');
    }
});

app.post('api/tasks', async (req, res) => {
    if (req.body === undefined) {
        console.log('Indsendte task: ' + req.body);
        res.status(400).send('Opgave mangler. Påkrævet felt: text');
    }
    const text = req.body.text;

    if (text === undefined) {
        const missingDetailsMessage = 'Information mangler: [text]';
        res.status(400).send(missingDetailsMessage);
        return;
    }

    try {
        const taskData = await fs.readFile(
            tasksData,
            'utf8'
        );
        const tasks = JSON.parse(taskData);

        let uuid = crypto.randomUUID();
        //TODO
    } catch (error) {
        //<todo
    }

})

app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});