const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports.createUser = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email })
		if (user)
			return res.status(400).json({ error: "Sorry, a user with this e-mail already exists" })

		user = await User.create({
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
		})

		const data = {
			user: {
				id: user._id,
			},
		}

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err
				user.password = hash
				user
					.save()
					.then((user) => {
						jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 259200 }, (err, token) => {
							if (err) throw err
							res.json({
								token,
							})
						})
					})
					.catch((err) => console.log(err))
			})
		})
		// console.log(data)
	} catch (error) {
		console.error(error.message)
		res.status(500).send("Some Error Occured")
	}
}

module.exports.login = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email })
		if (!user) return res.status(400).json({ error: "User does not exist!" })

		const data = {
			user: {
				id: user._id,
			},
		}

		bcrypt.compare(req.body.password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

			jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 2592000 }, (err, token) => {
				if (err) throw err
				res.json({
					token,
				})
			})
		})
		// console.log(data)
	} catch (error) {
		console.error(error.message)
		res.status(500).send("Some Error Occured")
	}
}

module.exports.getuser = async (req, res) => {
	try {
		userID = req.user.id
		const user = await User.findById(userID).select("-password")
		res.send(user)
	} catch (error) {
		res.status(500).send("Internal Server Error")
	}
}
