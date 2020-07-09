const fs = require('fs')
const data = require("../data.json")
const { age, date, graduation } = require("../utils")

// Index
exports.index = function (req, res) {
    return res.render("teachers/index", { teachers: data.teachers })
}

// Create
exports.create = function (req, res) {
    return res.render("teachers/create")
}

// Post
exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            let erro = "Por favor preencha todos os campos."
            return res.render("err", { erro: erro })
        }
    }

    let { avatar_url, name, birth, education, type_class, area } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education,
        type_class,
        area,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) {
            let erro = "Erro ao gravar arquivo."
            return res.render("err", { erro: erro })
        }
        return res.redirect("/teachers")
    })



}

// Show
exports.show = function (req, res) {
    const { id } = req.params
    const foundTeachers = data.teachers.find(function (teacher) {
        return teacher.id == id
    })
    if (!foundTeachers) {
        let erro = "Professor não encontrado."
        return res.render("err", { erro: erro })
    }

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        education: graduation(foundTeachers.education),
        area: foundTeachers.area.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundTeachers.created_at)
    }
    return res.render("teachers/show", { teachers: teacher })
}

// Edit
exports.edit = function (req, res) {
    const { id } = req.params
    const foundTeachers = data.teachers.find(function (teacher) {
        return teacher.id == id
    })
    if (!foundTeachers) {
        let erro = "Professor não encontrado."
        return res.render("err", { erro: erro })
    }

    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth).iso
    }

    return res.render("teachers/edit", { teachers: teacher })
}

// Put
exports.update = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundTeachers = data.teachers.find(function (teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundTeachers) {
        let erro = "Professor não encontrado."
        return res.render("err", { erro: erro })
    }

    const teacher = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) {
            let erro = "Erro ao gravar arquivo."
            return res.render("err", { erro: erro })
        }
        return res.redirect(`/teachers/${id}`)
    })
}

// Delete
exports.delete = function (req, res) {
    const { id } = req.body
    const filteredTeachers = data.teachers.filter(function (teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) {
            let erro = "Erro ao gravar arquivo."
            return res.render("err", { erro: erro })
        }
        return res.redirect("/teachers")
    })
}