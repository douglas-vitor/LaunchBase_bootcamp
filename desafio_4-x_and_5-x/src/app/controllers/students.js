const db = require("../../config/db")
const { date, grade } = require("../../lib/utils")
const Student = require("../models/Student")

module.exports = {
    index(req, res) {
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 10
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render("students/index", { students, filter, pagination })
            }
        }
        Student.paginate(params)
    },
    create(req, res) {
        Student.instructorSelectOptions(function(options) {
            return res.render("students/create", { options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                let erro = "Por favor preencha todos os campos."
                return res.render("err", { erro: erro })
            }
        }
    
        Student.create(req.body, function(student) {
            return res.redirect(`students/${student.id}`)
        })
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if (!student) {
                let erro = "Estudante não encontrado."
                return res.render("err", { erro: erro })
            }

            student.education = grade(student.education_level)
            student.birth = date(student.birth_date).birthDay

            Student.instructorSelectOptions(function(teacher) {
                return res.render("students/show", { student, teacher })
            })
        })
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) {
                let erro = "Estudante não encontrado."
                return res.render("err", { erro: erro })
            }

            student.birth = date(student.birth_date).iso

            Student.instructorSelectOptions(function(options) {
                return res.render("students/edit", { student, options })
            })
        })    
    },
    update(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if(req.body[key] == "") {
                let erro = "Por favor, preencha todos os campos."
                return res.render("err", { erro: erro })
            }
        }

        let data = {
            ...req.body,
            birth_date: req.body.birth,
            education_level: req.body.education,
            class_type: req.body.type_class,
            subjects_taught: req.body.area
        }
        Student.update(data, function() {
            return res.redirect(`students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
      
    }
}