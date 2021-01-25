import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: "Fala Go Stack s2",
    })
})

app.listen(3333, () =>{
    console.log('App started on port 3333');
});