const express = require('express')
const router = express.Router()
const students = require("../controllers/students")
const auth =require("../middlewares/auth")

router.post("/", auth, students.postStudent)
router.get("/", students.getStudents)
router.get("/:name", students.getStudent)
router.put("/:id", auth, students.updateStudents)
router.delete("/:name", auth, students.deleteStudents)

module.exports = router