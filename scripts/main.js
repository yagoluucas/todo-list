window.addEventListener('DOMContentLoaded', () => {
    let quantidadeDeAnotacoes
    const main = document.querySelector('main')
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')
    function apagarAnotacao(lixeiraClicado) {
        function confirmaApagarAnotacao() {
            btnSectionApagarAnotacao.forEach((btn) => btn.removeEventListener('click', confirmaApagarAnotacao))
            switch (this.textContent) {
                case "Sim":
                    main.removeChild(lixeiraClicado.target.parentElement)
                    btnSectionApagarAnotacao[0].parentElement.classList.add('none')
                    sectionApagarAnotacao.firstElementChild.textContent = 'Anotação apagada'
                    setTimeout(() => {
                        btnSectionApagarAnotacao[0].parentElement.classList.remove('none')
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
    if (localStorage.getItem('quantidadeDeAnotacoes') >= 1) {
        quantidadeDeAnotacoes = +localStorage.getItem('quantidadeDeAnotacoes')
        for (let n = 1; n <= quantidadeDeAnotacoes; n++) {
            let infoAnotacao = JSON.parse(localStorage.getItem(`anotacao ${n}`))
            const sectionAnotacao = document.createElement('section')
            sectionAnotacao.classList.add('section-anotacao')
            const dataAnotacao = document.createElement('p')
            const paragrafoAnotacao = document.createElement('p')
            paragrafoAnotacao.classList.add('anotacao')
            dataAnotacao.classList.add('data-anotacao')
            dataAnotacao.textContent = infoAnotacao[1]
            paragrafoAnotacao.textContent = infoAnotacao[0]
            sectionAnotacao.appendChild(dataAnotacao)
            sectionAnotacao.appendChild(paragrafoAnotacao)
            let imgLixeira = document.createElement('img')
            imgLixeira.setAttribute('src', '../image/lixeira.svg')
            imgLixeira.setAttribute('alt', 'lixeira')
            imgLixeira.classList.add('img-lixeira', 'js-img-lixeira')
            sectionAnotacao.appendChild(imgLixeira)
            main.insertBefore(sectionAnotacao, main.firstChild)
            imgLixeira.addEventListener('click', apagarAnotacao)
        }


    } else {
        quantidadeDeAnotacoes = 0
    }
    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const data = new Date()
    const header = document.querySelector('header')

    function removerFundoApagarAnotacao() {
        sectionApagarAnotacao.classList.add('none')
        document.body.classList.remove('escurecer-fundo')
        main.classList.remove('deixar-transparente')
        header.classList.remove('deixar-transparente')
    }

    function gerarAnotacao() {
        console.log('oi')
        quantidadeDeAnotacoes += 1
        const mesFormatado = data.getMonth() + 1 < 10 ? '0'.concat(`${data.getMonth() + 1}`) : data.getMonth() + 1
        const dataAnotacao = document.createElement('p')
        dataAnotacao.textContent = `data da anotação : ${data.getDate()}/${mesFormatado}/${data.getFullYear()}`
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
        main.insertBefore(sectionAnotacao, main.firstChild)
        const teste = gerarObjeto(paragrafoAnotacao.textContent, dataAnotacao.textContent)
        localStorage.setItem(`anotacao ${quantidadeDeAnotacoes}`, JSON.stringify(teste))
        localStorage.quantidadeDeAnotacoes = quantidadeDeAnotacoes
        imgLixeira.addEventListener('click', apagarAnotacao)
    }

    function gerarObjeto(anotacao, dataAnotacao) {
        return [anotacao, dataAnotacao]
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