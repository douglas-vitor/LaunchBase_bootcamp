module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate()) {
            age = age - 1
        }
        return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        // yyyy
        const year = date.getUTCFullYear()
        // mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        // dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    graduation: function(education) {
        let formation_teacher = ""
        if(education == "fundamental") {
            formation_teacher = "Ensino fundamental"
        } else if(education == "medio") {
            formation_teacher = "Ensino médio completo"
        } else if(education == "superior") {
            formation_teacher = "Ensino superior completo"
        } else if(education == "mestrado") {
            formation_teacher = "Mestrado"
        } else if(education = "doutorado") {
            formation_teacher = "Doutorado"
        }

        return formation_teacher
    },
    grade: function(education) {
        let formation_teacher = ""
        if(education == "5EF") {
            formation_teacher = "5º Ano do Ensino Fundamental"
        } else if(education == "6EF") {
            formation_teacher = "6º Ano do Ensino Fundamental"
        } else if(education == "7EF") {
            formation_teacher = "7º Ano do Ensino Fundamental"
        } else if(education == "8EF") {
            formation_teacher = "8º Ano do Ensino Fundamental"
        } else if(education == "9EF") {
            formation_teacher = "9º Ano do Ensino Fundamental"
        } else if(education == "1EM") {
            formation_teacher = "1º Ano do Ensino Médio"
        } else if(education == "2EM") {
            formation_teacher = "2º Ano do Ensino Médio"
        } else if(education == "3EM") {
            formation_teacher = "3º Ano do Ensino Médio"
        }

        return formation_teacher
    }
}