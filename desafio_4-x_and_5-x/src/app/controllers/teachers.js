const { age, date, graduation } = require("../../lib/utils")
const Teacher = require("../models/Teacher")

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
            callback(teachers) {
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }
                return res.render("teachers/index", { teachers, filter, pagination })
            }
        }
        Teacher.paginate(params)
    },
    create(req, res) {
        return res.render("teachers/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                let erro = "Por favor preencha todos os campos."
                return res.render("err", { erro: erro })
            }
        }
    
        Teacher.create(req.body, function(teacher) {
            return res.redirect(`teachers/${teacher.id}`)
        })
    },
    show(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) {
                let erro = "Professor não encontrado."
                return res.render("err", { erro: erro })
            }

            teacher.education = graduation(teacher.education_level)
            teacher.age = age(teacher.birth_date)
            teacher.area = teacher.subjects_taught.split(",")
            teacher.type_class = teacher.class_type
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) {
                let erro = "Professor não encontrado."
                return res.render("err", { erro: erro })
            }

            teacher.birth = date(teacher.birth_date).iso

            return res.render("teachers/edit", { teacher })
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
        Teacher.update(data, function() {
            return res.redirect(`teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function() {
            return res.redirect(`/teachers`)
        })
      
    }
}