const express = require("express")
const server = express()

// Pasta pblica vai ser a raiz do repositorio
server.use(express.static("."))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure(".", {
    express: server,
    noCache: true
})

// Configurando as rotas

server.get("/about", (req, res) => {
    return res.render("desafio_3-1_about.njk")
})

// Courses
// Courses que vai ser minha home
server.get("/", (req, res) => {
    return res.render("desafio_3-1_courses.njk")
})

// Not-found
server.use(function(req, res) {
    return res.status(404).render("desafio_3-1_not-found.njk")
})

// Ligar servidor
server.listen(3000)