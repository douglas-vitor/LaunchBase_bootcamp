// Bootcamp LaunchBase - Rocketseat
// Desafio 1 - 3

// Programa 01
/*
const users = [
    {name : "Carlos", technologies : ["HTML", "CSS"]},
    {name : "Pedro", technologies : ["JavaScript", "CSS"]},
    {name : "Tuane", technologies : ["HTML", "NODE.JS"]},
]

for (user in users) {
    console.log(`${users[user].name} works with ${users[user].technologies}`)
}*/


// Buscando pela tecnologia CSS
// Este programa usa a mesma lista do programa 01
/*
function CheckTechnologieCSS(data) {
    for (let tech of data.technologies) {
        if (tech == "CSS") 
            return true
    }
    return false
}

for (i in users) {
    const userWorkswithCSS = CheckTechnologieCSS(users[i])
    
    if (userWorkswithCSS) {
        console.log(`The user ${users[i].name} works with CSS`)
    } 
}
*/


// Programa 03

const users = [
    {
      nome: "Salvio",
      receitas: [115.3, 48.7, 98.3, 14.5],
      despesas: [85.3, 13.5, 19.9]
    },
    {
      nome: "Marcio",
      receitas: [24.6, 214.3, 45.3],
      despesas: [185.3, 12.1, 120.0]
    },
    {
      nome: "Lucia",
      receitas: [9.8, 120.3, 340.2, 45.3],
      despesas: [450.2, 29.9]
    }
]

function calculaSaldo(receitas, despesas) {
    let resultReceitas = somaNumeros(receitas)
    let resultDespesas = somaNumeros(despesas)
    let resultado = resultReceitas - resultDespesas
    return resultado
}

function somaNumeros(numeros) {
    let soma = 0
    for (num in numeros) {
        soma += numeros[num]
    }
    return soma
}

for (i in users) {
    let saldo = calculaSaldo(users[i].receitas, users[i].despesas)
    if (saldo < 0) {
        console.log(`${users[i].nome} possui saldo NEGATIVO de ${saldo}.`)
    } else{
        console.log(`${users[i].nome} possui saldo POSITIVO de ${saldo}.`)
    }
}