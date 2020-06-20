const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function () {
        const infoId = card.getAttribute("id")
        modalOverlay.classList.add('active')
        modalOverlay.querySelector("iframe").src = `https://rocketseat.com.br/${infoId}`
    })

    card.addEventListener("click", function () {
        let maximize = document.querySelector('.modal').classList.contains('maximize')
        if (maximize == false) {
            document.querySelector('.modal').classList.add('maximize')
        }
    })
}

document.querySelector('.close-modal').addEventListener("click", function () {
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = ""
    document.querySelector('.modal').classList.remove('maximize')
})

