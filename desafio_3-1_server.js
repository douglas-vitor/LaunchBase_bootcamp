const express = require("express")
const server = express()

// Importando dados do arquivos data
const courses = require("./desafio_3-2_data_courses")
const about = require("./desafio_3-2_data_about")

// Pasta pblica vai ser a raiz do repositorio
server.use(express.static("."))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure(".", {
    express: server,
    noCache: true,
    autoescape: false
})

// Configurando as rotas

server.get("/about", (req, res) => {
    return res.render("desafio_3-1_about.njk", { about: about })
})

// Courses
// Courses que vai ser minha home
server.get("/", (req, res) => {
    return res.render("desafio_3-1_courses.njk", { data: courses })
})

// View info course
server.get("/courses", function (req, res) {
    // pega da url a query id
    const name = req.query.id
    // Criado um objeto para ser passado para a pagina que apresentara as informações
    const info = {
        name: name
    }
    // Array para validação com os cursos existentes
    const validate = ["starter", "launchbase", "gostack"]
    // Procura no array o id enviado pela url
    const test = validate.find(function (test) {
        if (test == name) {
            return true
        }
    }) 
    // Se função acima retornar false, então else não sera true e retornar pagina not-found
    if (!test) {
        return res.status(404).render("desafio_3-1_not-found.njk")
    }
    // Em caso de não ter sido barrado no if acima, e ter sido encontrado no array da validação, retonar a pagina com o id valido
    return res.render("desafio_3-3_view-info-course.njk", { info: info })
})

// Not-found
server.use(function (req, res) {
    return res.status(404).render("desafio_3-1_not-found.njk")
})



// Ligar servidor
server.listen(3000)