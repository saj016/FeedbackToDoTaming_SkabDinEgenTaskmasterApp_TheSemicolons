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
//app.use(express.static(path.join(__dirname, 'public')));

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

        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send('Der opstod en fejl ved hentning af to-do listen');
    }
});

app.post('/api/tasks', async (req, res) => {
    if (req.body === undefined) {
        console.log('Indsendte task: ' + req.body);
        res.status(400).send('Opgave mangler. Påkrævet felt: text');
        return;
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
        const newTask = {
            id: uuid,
            text: text
        }

        tasks.push(newTask);
        await fs.writeFile(tasksData, JSON.stringify(tasks, null, 2), 'utf8');
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send('Der opstod en fejl ved oprettelsen af den nye opgave');
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    const idToDelete = req.params.id;

    try {
        const taskData = await fs.readFile(
            tasksData,
            'utf8'
        );
        const tasks = JSON.parse(taskData);

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === idToDelete) {
                tasks.splice(i, 1); //slice tager først required index, hvor der skal slettes (eller tilføjes), og et optional count af hvor mange, der skal slettes
                //ovenstående: på indekx i, fjern 1 element
                i = tasks.length;
            }
        }

        await fs.writeFile(tasksData, JSON.stringify(tasks, null, 2), 'utf8');
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send('Der opstod en fejl ved slettelsen af den valgte opgave');
    }

});

app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});