const db = require("../../config/db")
const { age, date, graduation, grade } = require("../../lib/utils")
const Student = require("../models/Student")
const { query } = require("../../config/db")

module.exports = {
    index(req, res) {
        let {filter} = req.query
        if(filter) {
            Student.findBy(filter, function(datamy) {
            return res.render("students/index", { students: datamy, filter})
            })
        } else {
            Student.all(function(students) {
                return res.render("students/index", { students })
            })
        }
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
                let erro = "Professor não encontrado."
                return res.render("err", { erro: erro })
            }

            student.education = grade(student.education_level)
            student.birth = date(student.birth_date).birthDay

            return res.render("students/show", { student })
        })
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) {
                let erro = "Professor não encontrado."
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