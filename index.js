require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")
const app = express()
app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

const authRouter = require('./routes/auth')

app.use('/users', authRouter)




mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => {
    console.log(" DataBase connected...")
});



const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server is  listing  at http://localhost: ${PORT}`)
})