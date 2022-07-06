const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const notesController = require("../controllers/notesController");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", authMiddleware, notesController.fetchallnotes);

router.post(
  "/addnote",
  authMiddleware,
  [
    body(
      "title",
      "Minimum length of the title must be atleast 5 characters"
    ).isLength({ min: 5 }),
    body(
      "description",
      "Minimum length of the description must be atleast 5 characters"
    ).isLength({ min: 5 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  notesController.addnote
);

router.put("/updatenote/:id", authMiddleware, notesController.updatenote);

router.delete("/deletenote/:id", authMiddleware, notesController.deletenote);

module.exports = router;
