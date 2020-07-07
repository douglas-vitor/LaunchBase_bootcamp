const express = require('express')
const routes = express.Router()
const teachers = require("./teachers")

routes.get("/", function (req, res) {
    return res.redirect("/teachers")
})

routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.post("/teachers", teachers.post)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)
routes.put("/teachers", teachers.put)

module.exports = routes