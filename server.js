const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})
