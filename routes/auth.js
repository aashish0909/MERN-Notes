const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post(
	"/createuser",
	[
		body("name", "Enter atleast 3 characters").isLength({ min: 3 }),
		body("email", "Enter a valid e-mail address").isEmail(),
		body("password", "Password must be atleast 8 characters").isLength({ min: 8 }),
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}
			next()
		},
	],
	authController.createUser
)

router.post("/login",
[
    body("email", "Enter a valid e-mail address").isEmail(),
    body("password", "Password cannot be empty").exists(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
    authController.login
],
)

router.get("/getuser",authMiddleware,authController.getuser)

module.exports = router
