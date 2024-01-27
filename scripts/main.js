window.addEventListener('DOMContentLoaded', () => {

    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const main = document.querySelector('main')
    const data = new Date()
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')
    const header = document.querySelector('header')
    function removerFundoApagarAnotacao() {
        sectionApagarAnotacao.classList.add('none')
        document.body.classList.remove('escurecer-fundo')
        main.classList.remove('deixar-transparente')
        header.classList.remove('deixar-transparente')
    }

    function apagarAnotacao(lixeiraClicado) {
        function confirmaApagarAnotacao() {
            btnSectionApagarAnotacao.forEach((btn) => btn.removeEventListener('click', confirmaApagarAnotacao))
            switch (this.textContent) {
                case "Sim":
                    main.removeChild(lixeiraClicado.target.parentElement)
                    btnSectionApagarAnotacao.forEach((btn) => btn.classList.add('none'))
                    sectionApagarAnotacao.firstElementChild.textContent = 'Anotação apagada'
                    setTimeout(() => {
                        sectionApagarAnotacao.firstElementChild.textContent = 'Deseja Realmente apagar a anotação ?'
                        btnSectionApagarAnotacao.forEach((btn) => btn.classList.remove('none'))
                        removerFundoApagarAnotacao()
                    }, 1500)
                    break

                case "Não":
                    removerFundoApagarAnotacao()
                    break
            }
        }

        document.body.classList.add('escurecer-fundo')
        main.classList.add('deixar-transparente')
        sectionApagarAnotacao.classList.add('animacao-apagar-anotacao')
        sectionApagarAnotacao.classList.remove('none')
        header.classList.add('deixar-transparente')
        btnSectionApagarAnotacao.forEach((btn) => btn.addEventListener('click', confirmaApagarAnotacao))

    }

    function gerarAnotacao() {
        const mesFormatado = data.getMonth() + 1 < 10 ? '0'.concat(`${data.getMonth() + 1}`) : data.getMonth() + 1
        const dataAnotacao = document.createElement('p')
        dataAnotacao.textContent = `data : ${data.getDate()}/${mesFormatado}/${data.getFullYear()}`
        dataAnotacao.classList.add('data-anotacao')
        let imgLixeira = document.createElement('img')
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


    inputTextoAnotacao.addEventListener('keyup', () => {
        if (inputTextoAnotacao.checkValidity()) {
            btnGerarAnotacao.addEventListener('click', gerarAnotacao)
            btnGerarAnotacao.removeAttribute('disabled')
        } else {
            btnGerarAnotacao.setAttribute('disabled', 'true')
            btnGerarAnotacao.removeEventListener('click', gerarAnotacao)
        }
    })


})