window.addEventListener('DOMContentLoaded', () => {

    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const main = document.querySelector('main')
    const data = new Date()
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')

    function apagarAnotacao(lixeiraClicado) {

        function confirmaApagarAnotacao() {
            btnSectionApagarAnotacao.forEach((btn) => btn.removeEventListener('click', confirmaApagarAnotacao))
            switch(this.textContent) {
                case "Sim":
                    console.log(lixeiraClicado.target.parentElement)
                    main.removeChild(lixeiraClicado.target.parentElement)
                    btnSectionApagarAnotacao.forEach((btn) => btn.classList.add('none'))
                    sectionApagarAnotacao.firstElementChild.textContent = 'Anotação apagada'
                    setTimeout(() => {
                        sectionApagarAnotacao.firstElementChild.textContent = 'Deseja Realmente apagar a anotação ?'
                        btnSectionApagarAnotacao.forEach((btn) => btn.classList.remove('none'))
                        sectionApagarAnotacao.classList.add('none')
                        document.body.classList.remove('escurecer-fundo')
                        main.classList.remove('deixar-transparente')
                    }, 1500)
                break

                case "Não":
                    sectionApagarAnotacao.classList.add('none')
                    document.body.classList.remove('escurecer-fundo')
                    main.classList.remove('deixar-transparente')
                break
            }
        }


        document.body.classList.add('escurecer-fundo')
        main.classList.add('deixar-transparente')
        sectionApagarAnotacao.classList.remove('none')
        btnSectionApagarAnotacao.forEach((btn) => btn.addEventListener('click', confirmaApagarAnotacao))

    }

    function gerarAnotacao() {
        const mesFormatado = data.getMonth() + 1 < 10 ? '0'.concat(`${data.getMonth() + 1}`) : data.getMonth() + 1
        const dataAnotacao = document.createElement('p')
        dataAnotacao.textContent = `data : ${data.getDate()}/${mesFormatado}/${data.getFullYear()}`
        dataAnotacao.classList.add('data-anotacao')
        const imgLixeira = document.createElement('img')
        imgLixeira.setAttribute('src', '../image/lixeira.svg')
        imgLixeira.setAttribute('alt', 'lixeira')
        imgLixeira.classList.add('img-lixeira', 'js-img-lixeira')
        const sectionAnotacao = document.createElement('section')       
        const paragrafoAnotacao = document.createElement('p')
        paragrafoAnotacao.classList.add('anotacao')
        paragrafoAnotacao.textContent = inputTextoAnotacao.value
        sectionAnotacao.appendChild(dataAnotacao)
        sectionAnotacao.appendChild(paragrafoAnotacao)
        sectionAnotacao.classList.add('section-anotacao')
        sectionAnotacao.appendChild(imgLixeira)
        main.appendChild(sectionAnotacao)
        imgLixeira.addEventListener('click', apagarAnotacao)
    }

    
    btnGerarAnotacao.addEventListener('click', gerarAnotacao)

})