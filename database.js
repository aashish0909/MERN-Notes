require("dotenv").config()
const mongoose = require("mongoose")
const mongoURI = process.env.DB_URI

const connectToMongo = () => {
	mongoose
		.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log("Connected to the Database"))
		.catch((err) => console.log(err))
}

module.exports = connectToMongo
