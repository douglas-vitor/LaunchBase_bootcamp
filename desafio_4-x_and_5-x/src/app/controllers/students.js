const db = require("../../config/db")
const { age, date, graduation, grade } = require("../../lib/utils")
const Student = require("../models/Student")

module.exports = {
    index(req, res) {
        db.query(`SELECT * FROM students`, function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

        return res.render("students/index", { students: results.rows })
        })
    },
    create(req, res) {
        return res.render("students/create")
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
            student.created_at = date(student.created_at).format

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

            return res.render("students/edit", { student })
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