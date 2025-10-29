const app = require('express')();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log('yippeee http://localhost:${PORT}')
)

app.get('/song/:md5', (req, res) => {

    const { md5 } = req.params;

    res.status(200).send({
        songChart:'chart for the song ' + md5,
        songAudio:'not formated like that...'
    })
    
})