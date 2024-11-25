const express = require('express')
const cors = require('cors');
const Connectdb = require('./db');
const { Signup, SignIn, cartProduct, GetSign } = require('./controllers/Allcontroller');
const app = express()


app.use(cors());

app.use(express.json());

app.post('/signup', Signup)
app.post('/signin', SignIn)


Connectdb().then(() => {
    app.listen(4000, () => {
        console.log("Your port is: 4000")
    })
})

module.exports = app