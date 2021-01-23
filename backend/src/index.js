const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Fala Dev!')
})

app.listen(3333, () => {
    console.log('App is runing on port 3333');
});