// Bootcamp LaunchBase - Rocketseat
// Desafio 1 - 4

// Programa 01
const user = {
    name : "Mariana",
    transactions : [],
    balance : 0
}

// Transações teste
let tran01 = {
    type : 'credit',
    value : 50.5
}
let tran02 = {
    type : 'debit',
    value : 51.5
}
let tran03 = {
    type : 'credit',
    value : 90.5
}

function createTransaction(transaction) {
    user.transactions.push(transaction)
    if(transaction.type == 'credit') {
        user.balance += transaction.value
    } else if(transaction.type == 'debit') {
        user.balance -= transaction.value
    }
}

function getHigherTransactionByType(type) {
    let found = []

    for(i of user.transactions){
        if(i.type == type) {
            found.push(i.value) 
        }
    }
    for(i of user.transactions) {
        let maxArray = Math.max.apply(null, found)
        if(i.type == type && i.value == maxArray) {
            return i
        }
    }
}

function getAverageTransactionValue(object) {
    let tamanhoArray = user.transactions.length
    let soma = 0
    for(t in user.transactions){
        soma += user.transactions[t].value
    }
    return soma / tamanhoArray
}

function getTransactionsCount(object) {
    let foundCreditTransaction = []
    let foundDebitTransaction = []
    
    for(t of user.transactions) {
        if(t.type == 'credit') {
            foundCreditTransaction.push(1)
        }
        if(t.type == 'debit') {
            foundDebitTransaction.push(1)
        }
    }

let totalTransacoesCredito = foundCreditTransaction.length
let totalTransacoesDebito = foundDebitTransaction.length
const resposta = { credit : totalTransacoesCredito, debit : totalTransacoesDebito}

return resposta
}

createTransaction(tran01)
createTransaction(tran02)
createTransaction(tran03)

let maiorDebito = getHigherTransactionByType('debit')
let maiorCredito = getHigherTransactionByType('credit')

console.log(`Maior transação do tipo Credito:`)
console.log(maiorCredito)
console.log(' ') // Apenas para espaçamento

console.log(`Maior transação do tipo Debito:`)
console.log(maiorDebito)
console.log(' ') // Apenas para espaçamento

let mediaTransacoes = getAverageTransactionValue(user)
console.log(`O valor médio das transações é de : ${mediaTransacoes}`)
console.log(' ') // Apenas para espaçamento

let totalTransacoesUser = getTransactionsCount(user)
console.log('Total de transações do usuario :')
console.log(totalTransacoesUser)