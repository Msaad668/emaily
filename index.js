const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({ Hofnung : 'Ein deutsches woert'})
})


const PORT = process.env.PORT || 5000
app.listen(PORT)