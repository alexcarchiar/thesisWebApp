const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser')
const postsRoute = require('./Routes/posts')
const cors = require('cors')
const buffer = require('buffer')

const app = express()

const crypto = require('crypto')

public_key = process.env.PUBLIC_KEY

app.use(cors())
app.use(bodyParser.json())

app.use('/posts', postsRoute)

app.get('/', (req,res) =>
    res.send("We are on home\nPublic key is: \n"+process.env.PUBLIC_KEY)
)

//connect to db
mongoose.set('strictQuery', false)
try {
    mongoose.connect(
        process.env.DB_CONNECTION,
    () => console.log('connected to db'))
} catch(e) {
    console.log(e)
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

