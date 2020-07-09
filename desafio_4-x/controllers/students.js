const fs = require('fs')
const data = require("../data.json")
const { age, date, graduation } = require("../utils")

// Index
exports.index = function(req,res) {
    return res.render("students/index", { students: data.students })
}

// Create
exports.create = function(req, res) {
    return res.render("students/create")
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
    const id = Number(data.students.length + 1)

    data.students.push({
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
        return res.redirect("/students")
    })



}

// Show
exports.show = function(req, res) {
    const { id } = req.params
    const foundStudents = data.students.find(function(student) {
        return student.id == id
    })
    if(!foundStudents) {
        return res.send("Student not found")
    }

    const student = {
        ...foundStudents,
        age: age(foundStudents.birth),
        education: graduation(foundStudents.education),
        area: foundStudents.area.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundStudents.created_at)
    }
    return res.render("students/show", { students: student })
}

// Edit
exports.edit = function(req, res) {
    const { id } = req.params
    const foundStudents = data.students.find(function(student) {
        return student.id == id
    })
    if(!foundStudents) {
        return res.send("student not found")
    }

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso
    }

    return res.render("students/edit", { students: student })
}

// Put
exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudents = data.students.find(function(student, foundIndex) {
        if(id == student.id) {
            index = foundIndex
            return true
        }
    })
    if(!foundStudents) {
        return res.send("Student not found")
    }

    const student = {
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) {
            return res.send("write error")
        }
        return res.redirect(`/students/${id}`)
    })
}

// Delete
exports.delete = function(req, res) {
    const {id} = req.body
    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) {
            return res.send("write file error")
        }
        return res.redirect("/students")
    })
}