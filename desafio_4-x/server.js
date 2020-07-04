const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})



server.get("/", function (req, res) {
    return res.redirect("/teachers")
})

server.get("/teachers", function(req,res) {
    return res.render("teachers/index")
})





server.listen(5000)