const fs = require('fs')
const data = require("../../config/db")
const { age, date, graduation, grade } = require("../../lib/utils")

// Index
exports.index = function (req, res) {
    return res.render("students/index", { students: data.students })
}

// Create
exports.create = function (req, res) {
    return res.render("students/create")
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

    let { avatar_url, name, birth, email, education, studyload } = req.body

    birth = Date.parse(birth)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    if (lastStudent) {
        id = lastStudent.id + 1
    }


    data.students.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        education,
        studyload
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) {
            let erro = "Erro ao gravar arquivo."
            return res.render("err", { erro: erro })
        }
        return res.redirect("/students")
    })



}

// Show
exports.show = function (req, res) {
    const { id } = req.params
    const foundStudents = data.students.find(function (student) {
        return student.id == id
    })
    if (!foundStudents) {
        let erro = "Estudante não encontrado."
        return res.render("err", { erro: erro })
    }

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).birthDay,
        education: grade(foundStudents.education)
    }
    return res.render("students/show", { students: student })
}

// Edit
exports.edit = function (req, res) {
    const { id } = req.params
    const foundStudents = data.students.find(function (student) {
        return student.id == id
    })
    if (!foundStudents) {
        let erro = "Estudante não encontrado."
        return res.render("err", { erro: erro })
    }

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso
    }

    return res.render("students/edit", { students: student })
}

// Put
exports.update = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundStudents = data.students.find(function (student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundStudents) {
        let erro = "Estudante não encontrado."
        return res.render("err", { erro: erro })
    }

    const student = {
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) {
            let erro = "Erro ao gravar arquivo."
            return res.render("err", { erro: erro })
        }
        return res.redirect(`/students/${id}`)
    })
}

// Delete
exports.delete = function (req, res) {
    const { id } = req.body
    const filteredStudents = data.students.filter(function (student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) {
            let erro = "Erro ao gravar arquivo."
            return res.render("err", { erro: erro })
        }
        return res.redirect("/students")
    })
}