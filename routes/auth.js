const express = require('express')
const router = express.Router()
const auth = require("../controllers/auth")

router.post("/register", auth.register)
router.post("/login", auth.login)
router.get("/", auth.getAdmins)
router.get("/:username", auth.getAdmin)
router.put("/:id", auth.updateAdmins)
router.delete("/:username", auth.deleteAdmins)

module.exports = router