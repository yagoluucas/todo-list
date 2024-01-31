export function apagarTodasAnotacoes(checbox) {
    window.addEventListener('DOMContentLoaded', () => {
        const btnApagarTodasAnotacoes = document.querySelector('.js-btn-apagar-todas-anotacoes')
        btnApagarTodasAnotacoes.addEventListener('click', () => {
            checbox.forEach(element => {
                const idCheckbox = element.getAttribute('value')
                console.log(idCheckbox)
            });
        })
    })
}