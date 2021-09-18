const express = require('express')
const router = express.Router()
const students = require("./students")
const authRoute = require('./auth')
const scores = require("./scores")

router.use("/students", students)
router.use("/auth", authRoute)
router.use("/scores", scores)

module.exports = router