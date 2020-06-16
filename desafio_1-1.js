// Bootcamp LaunchBase - Rocketseat
// Desafio 1 - 1

// Calculo de IMC
/*
const name = "Mayk"
const weight = 110
const height = 1.50

let imc = weight / (height * height)

if (imc >= 30) {
    console.log(`${name} Você esta acima do peso.`)
} else {
    console.log(`${name} você não esta acima do peso.`)
}
*/

// Calculo de aposentadoria

const name = "Angelica"
const sex = "F"
const age = 49
const contribution = 36

let sum = age + contribution

if (sex == "M") {
    if (sum >= 95) {
        console.log(`${name}, você pode se aposentar!`)
    } else {
        console.log(`${name}, você ainda não pode se aposentar.`)
    }
} else if (sex == "F") {
    if (sum >= 85) {
        console.log(`${name}, você pode se aposentar!`)
    } else {
        console.log(`${name}, você ainda não pode se aposentar.`)
    }
}



