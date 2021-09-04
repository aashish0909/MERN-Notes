//Packages
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

//Files
const connectToMongo = require("./database")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

connectToMongo()

//Routes
app.use("/api/auth", require("./routes/auth"))
app.use('/api/notes/',require('./routes/notes'))
