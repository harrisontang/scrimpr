const Joi = require('joi');
const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.static('staticstuff'));

const groupMembers = [
    {id:1, name:'Jennifer', team:'Backend'},
    {id:2, name:'Mark', team:'Frontend'},
    {id:3, name:'Erin', team:'Frontend'},
    {id:4, name:'Daniel', team:'Backend'},
    {id:5, name:'Jordan', team:'Backend'},
    {id:6, name:'"ladyhat" Harrison', team:'Frontend'},
];

app.get('/api/groupMembers', (req, res) =>{
    res.send(groupMembers);
});

app.get('/api/groupMembers/:name', (req, res) =>{
    const people = groupMembers.find(c=> c.name === req.params.name);
    if (!people) return res.status(404).send('That person was not found');
    res.send(people);
});

app.post('/api/groupMembers', (req, res) => {
    const result = validatepeople(req.body);
    const { error } = validatepeople(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const people = {
        id: groupMembers.length +1,
        name: req.body.name,
        team: req.body.team     
    };

    groupMembers.push(people);
    res.send(people);
});

function validatepeople(course) {
    const schema = {
        name: Joi.string().min(3).required(),
        team: Joi.string().required().valid('Backend','Frontend')
    };

    return Joi.validate(course, schema);
};

app.listen(3000, () => console.log('listening on port 3000...'));