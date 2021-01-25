import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: "Fala Dev",
    })
})

app.listen(3333, () =>{
    console.log('App is running on port 3333');
});