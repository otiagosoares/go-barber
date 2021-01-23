const express = require('express');

const app = express();

app.get('/', (req, res)=>{

    const {name, email} = req.query;

    let data = {
        message: `Fala ${name}! do email ${email}`,
    };

    res.json(data);
});

app.listen(3333, () => {
    console.log('App is runing on port 3333');
});