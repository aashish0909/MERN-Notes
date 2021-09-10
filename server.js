//Packages
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const path = require("path")

//Files
const connectToMongo = require("./database")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

connectToMongo()

//Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes/", require("./routes/notes"))

if (process.env.NODE_ENV === "production") {
	console.log("!!!!YAY")
	app.use(express.static(path.join(__dirname, "client", "build")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}