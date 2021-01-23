const express = require('express');
const uuid = require('uuid4');
const app = express();

app.use(express.json());
app.use(logRequests)

const projects = [
    
];

/*
    ##Middlewares
    intercepta requisições, podendo interromper ou alterar dados da requisição

*/
function logRequests(req, res, next){
    const { method, url} = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}


app.get('/projects', (req, res)=>{

    res.json(projects);
});

app.post('/projects', (req, res)=>{

    const {title, owner}= req.body;

    const project = {
        id: uuid(),
        title,
        owner,
    }

    projects.push(project);

    res.json(projects);
});

app.listen(3333, () => {
    console.log('App is runing on port 3333');
});