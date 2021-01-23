const express = require('express');
const cors = require('cors');
const { uuid,isUuid }= require('uuidv4');
const app = express();

app.use(express.json());
app.search(cors());
app.use(logRequests);

app.use('/projects/:id', validateProjectId);

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
    console.time(logLabel);

    next();

    console.timeEnd(logLabel)
}

function validateProjectId(req, res, next){
    const { id } = req.params;

    if(!isUuid(id)){
        return res.status(400).json({
            error: "Invalid project id",
        });
    }

    return next();
}


app.get('/projects', (req, res)=>{

    res.json(projects);
});

app.post('/projects', (req, res)=>{

    const {title, owner} = req.body;

    const project = {
        id: uuid(),
        title,
        owner,
    }

    projects.push(project);

    res.json(projects);
});

app.delete('/projects/:id',  (req, res)=>{

    const {id} = req.params;

    res.json(id);
});

app.listen(3333, () => {
    console.log('App is runing on port 3333');
});