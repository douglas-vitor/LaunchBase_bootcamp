const fs = require('fs')
const data = require("./data.json")
const { age, date, graduation } = require("./utils")

// Index
exports.index = function(req,res) {
    return res.render("teachers/index")
}

// Create
exports.create = function(req, res) {
    return res.render("teachers/create")
}

// Post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields")
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

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) {
            return res.send("Write file error")
        }
        return res.redirect("/teachers")
    })



}

// Show
exports.show = function(req, res) {
    const { id } = req.params
    const foundTeachers = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if(!foundTeachers) {
        return res.send("Teacher not found")
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
exports.edit = function(req, res) {
    const { id } = req.params
    const foundTeachers = data.teachers.find(function(teacher) {
        return teacher.id == id
    })
    if(!foundTeachers) {
        return res.send("teacher not found")
    }

    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth).iso
    }

    return res.render("teachers/edit", { teachers: teacher })
}

// Put
exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeachers = data.teachers.find(function(teacher, foundIndex) {
        if(id == teacher.id) {
            index = foundIndex
            return true
        }
    })
    if(!foundTeachers) {
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) {
            return res.send("write error")
        }
        return res.redirect(`/teachers/${id}`)
    })
}

// Delete
exports.delete = function(req, res) {
    const {id} = req.body
    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) {
            return res.send("write file error")
        }
        return res.redirect("/teachers")
    })
}