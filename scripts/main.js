window.addEventListener('DOMContentLoaded', () => {

    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const main = document.querySelector('main')
    const data = new Date()

    function apagarAnotacao(e) {
        if(prompt('Deseja remover o elemento ? ') == 'sim') {
            main.removeChild(e.target.parentElement)
        }       
    }

    function gerarAnotacao() {
        const mesFormatado = data.getMonth() + 1 < 10 ? '0'.concat(`${data.getMonth() + 1}`) : data.getMonth() + 1
        const dataAnotacao = document.createElement('p')
        dataAnotacao.textContent = `${data.getDate()}/${mesFormatado}/${data.getFullYear()}`
        const imgLixeira = document.createElement('img')
        imgLixeira.setAttribute('src', '../image/lixeira.svg')
        imgLixeira.setAttribute('alt', 'lixeira')
        imgLixeira.classList.add('img-lixeira', 'js-img-lixeira')
        const sectionAnotacao = document.createElement('section')       
        const paragrafoAnotacao = document.createElement('p')
        paragrafoAnotacao.textContent = inputTextoAnotacao.value
        sectionAnotacao.appendChild(paragrafoAnotacao)
        sectionAnotacao.classList.add('section-anotacao')
        sectionAnotacao.appendChild(imgLixeira)
        main.appendChild(sectionAnotacao)
        imgLixeira.addEventListener('click', apagarAnotacao)
    }

    
    btnGerarAnotacao.addEventListener('click', gerarAnotacao)

})