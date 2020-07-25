const data = require("../../config/db")
const { age, date, graduation } = require("../../lib/utils")

module.exports = {
    index(req, res) {
        return res.render("teachers/index", { teachers: data.teachers })
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
    },
    show(req, res) {
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
    },
    edit(req, res) {
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
    },
    update(req, res) {
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
        
    },
    delete(req, res) {
        const { id } = req.body
        const filteredTeachers = data.teachers.filter(function (teacher) {
            return teacher.id != id
        })
    
        data.teachers = filteredTeachers
      
    }
}