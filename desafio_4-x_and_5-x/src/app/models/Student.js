const db = require("../../config/db")
const { age, date, graduation } = require("../../lib/utils")

module.exports = {
    all(callback) {
        db.query(`
            SELECT * FROM students ORDER BY name ASC
        `, function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

        callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth_date,
                email,
                education_level,
                studyload,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.education,
            data.studyload,
            data.teacher_id
        ]

        db.query(query, values, function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

        callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT * 
            FROM students 
            WHERE id = $1
        `, [id], function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

        callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        //?
    },
    update(data, callback) {
        const query = `
            UPDATE students SET 
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            email=($4),
            education_level=($5),
            studyload=($6),
            teacher_id=($7)
            WHERE id = $8
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.education,
            data.studyload,
            data.teacher_id,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

        callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

            return callback()
        })
    },
    paginate(params) {
        //?
    },
    instructorSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results) {
            if(err) {
                throw `[Database error] : ${err}`
            }

            return callback(results.rows)
        })
    }
}