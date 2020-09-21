const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json({ limit: "1mb" }));

const generateHash = () => [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

let questions = new Map([
[    'test1',{
        'title' : "Symfony design pattern", 
        'choices' : ['MMV', 'MVC', 'MMVV'], 
        'response' : 1, //indice d'array, donc 1 = 2eme élément
        'type' : "select",
        'id' : "dzqsn8",
        'feedback' : 'Symfony est basé sur le pattern MVC'
    },
],
[
    'test2', {
        'title' : "React est-il un framework ?", 
        'choices' : ['yes', 'no'], 
        'response' : 1, 
        'type' : "radio",
        'id' : "Fu6hgdz",
        'feedback' : "React est une librairie"
    },
],
[
    'jsx', {
        'title' : "JSX c'est quoi ?", 
        'choices' : ['JSX est un langage compilé', 'JSX est un sur-ensemble développé par Facebook'], 
        'response' : 1, 
        'type': "radio" ,
        'id' : "jsx8Gge",
        'feedback' : 'JSX est un sur ensemble à JS'
    },
],
[    'apodf88gh', {
        'title' : "nouvelle question (la reponse est reponse 5) ?", 
        'choices' : ['reponse 1', 'reponse 2', 'reponse 3', 'reponse 4', 'reponse 5', 'reponse 6'], 
        'response' : 4, 
        'type': "select" ,
        'id' : "apodf88gh",
        'feedback' : 'La reponse était 5'
    },
],
[
    'ighdz8j', {
        'title' : "question test radio (la reponse est reponse 2) ?", 
        'choices' : ['reponse 1', 'reponse 2', 'reponse 3'], 
        'response' : 1, 
        'type': "radio" ,
        'id' : "ighdz8j",
        'feedback' : 'La reponse était 5'
    }
]
]);

// get all questions
app.get('/questions', (req, res) => {

    res.json(  { 
        questions : [ ...questions.values() ],
        success : true
     });
});

// store new Question
app.post('/add', (req, res) => {
    const { name, id:idb } = req.body;
    const id = idb;
    
    questions.set(id, req.body);

    // réponse
    res.json({
        status: 'success',
        name: name,
        id : id
    });
});

// get one Question 
app.get('/question/:id', (req, res) => {
    const { id } = req.params;

    if (questions.has(id)) {
        const question = questions.get(id);
        res.json({
            status: 'success',
            id: id,
            question: JSON.stringify(question)
        });
    }
    else
        res.status(404).send('Question not found');
});

// update One questions
app.put('/question/:id', (req, res, next) => {
    const { id } = req.params;

    if (questions.has(id)) {
        questions.set(id, req.body); // update 
        
        const question = questions.get(id);
        res.json({
            status: 'success',
            id: id,
            question: JSON.stringify(question)
        });
    }
    else
        res.status(404).send('Question not found');
});


// delete question
app.delete('/question/:id', (req, res) => {
    const { id } = req.params;
    
    if (questions.has(id)) {
        const name = questions.get(id).name;
        questions.delete(id);
        res.json({
            status: 'success deleted question',
            lastId: id,
            name: name
        });
    }
    else
        res.status(404).send('Question not found');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));