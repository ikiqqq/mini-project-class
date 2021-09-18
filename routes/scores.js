const express = require('express')
const scores = require('../controllers/scores')
const router = express.Router()
const auth =require("../middlewares/auth")

router.post("/", auth, scores.postScores)
router.get("/", scores.getScores)
router.get("/:idStudents", scores.getScore)
router.put("/:idStudents", auth, scores.updateScores)
router.delete("/:idStudents", auth, scores.deleteScores)

module.exports = router