window.addEventListener('DOMContentLoaded', () => {
    let quantidadeDeAnotacoes
    const main = document.querySelector('main')
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')
    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const data = new Date()
    const header = document.querySelector('header')
    if (localStorage.getItem('quantidadeDeAnotacoes') >= 1) {
        quantidadeDeAnotacoes = +localStorage.getItem('quantidadeDeAnotacoes')
        let anotacoes = []
        let n = 1
        do{
            n++
            let infoAnotacao = JSON.parse(localStorage.getItem(`anotacao ${n}`))
            if(infoAnotacao) {
                gerarSection(infoAnotacao[0], infoAnotacao[1], infoAnotacao[2])
                anotacoes.push(infoAnotacao)
            }
        }while(anotacoes.length < quantidadeDeAnotacoes)

    } else {
        quantidadeDeAnotacoes = 0
    }

    function gerarSection(textoAnotacao, textoDataAnotacao, idAnotacao) {
        const sectionAnotacao = document.createElement('section')
        sectionAnotacao.classList.add('section-anotacao')
        sectionAnotacao.setAttribute('data-idAnotacao', idAnotacao)
        const dataAnotacao = document.createElement('p')
        const paragrafoAnotacao = document.createElement('p')
        paragrafoAnotacao.textContent = textoAnotacao
        paragrafoAnotacao.classList.add('anotacao')
        dataAnotacao.classList.add('data-anotacao')
        dataAnotacao.textContent = textoDataAnotacao
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

    function apagarAnotacao(lixeiraClicado) {
        quantidadeDeAnotacoes -= 1
        localStorage.quantidadeDeAnotacoes = quantidadeDeAnotacoes
        function confirmaApagarAnotacao() {
            btnSectionApagarAnotacao.forEach((btn) => btn.removeEventListener('click', confirmaApagarAnotacao))
            switch (this.textContent) {
                case "Sim":
                    main.removeChild(lixeiraClicado.target.parentElement)
                    localStorage.removeItem(`anotacao ${lixeiraClicado.target.parentElement.getAttribute('data-idAnotacao')}`)
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

    function removerFundoApagarAnotacao() {
        sectionApagarAnotacao.classList.add('none')
        document.body.classList.remove('escurecer-fundo')
        main.classList.remove('deixar-transparente')
        header.classList.remove('deixar-transparente')
    }

    function gerarAnotacao() {
        quantidadeDeAnotacoes++
        const mesFormatado = data.getMonth() + 1 < 10 ? '0'.concat(`${data.getMonth() + 1}`) : data.getMonth() + 1
        const textoData = `data da anotação : ${data.getDate()}/${mesFormatado}/${data.getFullYear()}`
        gerarSection(inputTextoAnotacao.value, textoData, quantidadeDeAnotacoes)
        const anotacaoInfo = [inputTextoAnotacao.value, textoData, quantidadeDeAnotacoes]
        localStorage.setItem(`anotacao ${quantidadeDeAnotacoes}`, JSON.stringify(anotacaoInfo))
        localStorage.quantidadeDeAnotacoes = quantidadeDeAnotacoes
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