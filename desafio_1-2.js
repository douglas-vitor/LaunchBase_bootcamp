// Bootcamp LaunchBase - Rocketseat
// Desafio 1 - 2

// Programa 01
/*
const company = {
    name : "Rocketseat",
    color : "purple",
    focus : "Programming",
    address : "Street Guilherme Gembala - number 260"
}

console.log(`The company ${company.name} is located in ${company.address}`)
*/

// Programa 02

const programmers = {
    name: "Pedro",
    age: 12,
    technologies: [
        { name: "C++", specialty: "Desktop" },
        { name: "Python", specialty: "Data Science" },
        { name: "JavaScript", specialty: "Web/Mobile" }
    ]
}

console.log(`The user ${programmers.name} has ${programmers.age} years and use(s) the following technologie(s):`)
for (tech in programmers.technologies) {
    console.log(`${programmers.technologies[tech].name}, specializing in ${programmers.technologies[tech].specialty}`)
}