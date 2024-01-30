window.addEventListener('DOMContentLoaded', () => {
    let quantidadeDeAnotacoes
    let idAnotacao
    const main = document.querySelector('main')
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')
    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const data = new Date()
    const header = document.querySelector('header')
    if (localStorage.getItem('idsAnotacao') == null || localStorage.getItem('quantidadeDeAnotacoes') == null) {
        quantidadeDeAnotacoes = 0
        idAnotacao = 0
        localStorage.setItem('idsAnotacao', JSON.stringify([]))
    } else {
        idAnotacao = JSON.parse(localStorage.getItem('idsAnotacao'))
        idAnotacao = (idAnotacao[idAnotacao.length - 1])
        quantidadeDeAnotacoes = JSON.parse(localStorage.getItem('quantidadeDeAnotacoes'))
        const anotacoes = JSON.parse(localStorage.getItem('idsAnotacao'))
        anotacoes.forEach((id) => {
            let infoAnotacao = JSON.parse(localStorage.getItem(`anotacao ${id}`))
            gerarSection(infoAnotacao[0], infoAnotacao[1], infoAnotacao[2])
        })
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
        let arrayComId = JSON.parse(localStorage.getItem('idsAnotacao'))
        if (!(arrayComId.includes(idAnotacao))) {
            arrayComId.push(idAnotacao)
        }
        localStorage.setItem('idsAnotacao', JSON.stringify(arrayComId))
    }

    function apagarAnotacao(lixeiraClicado) {
        function confirmaApagarAnotacao() {
            btnSectionApagarAnotacao.forEach((btn) => btn.removeEventListener('click', confirmaApagarAnotacao))
            switch (this.textContent) {
                case "Sim":
                    let idAnotacaoRemovida = lixeiraClicado.target.parentElement.getAttribute('data-idAnotacao')
                    let idsAnotacoes = JSON.parse(localStorage.getItem('idsAnotacao'))
                    idsAnotacoes.splice(idsAnotacoes.indexOf(+idAnotacaoRemovida), 1)
                    localStorage.setItem('idsAnotacao', JSON.stringify(idsAnotacoes))
                    if (+localStorage.getItem('quantidadeDeAnotacoes') >= 1) {
                        quantidadeDeAnotacoes--
                        localStorage.setItem('quantidadeDeAnotacoes', quantidadeDeAnotacoes)
                    }
                    main.removeChild(lixeiraClicado.target.parentElement)
                    localStorage.removeItem(`anotacao ${idAnotacaoRemovida}`)
                    btnSectionApagarAnotacao[0].parentElement.classList.add('none')
                    sectionApagarAnotacao.firstElementChild.textContent = 'Anotação apagada'
                    setTimeout(() => {
                        btnSectionApagarAnotacao[0].parentElement.classList.remove('none')
                        sectionApagarAnotacao.firstElementChild.textContent = 'Deseja Realmente apagar a anotação ?'
                        btnSectionApagarAnotacao.forEach((btn) => btn.classList.remove('none'))
                        removerFundoApagarAnotacao()
                    }, 1300)
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
        idAnotacao++
        const mesFormatado = data.getMonth() + 1 < 10 ? '0'.concat(`${data.getMonth() + 1}`) : data.getMonth() + 1
        const textoData = `data da anotação : ${data.getDate()}/${mesFormatado}/${data.getFullYear()}`
        gerarSection(inputTextoAnotacao.value, textoData, idAnotacao)
        const anotacaoInfo = [inputTextoAnotacao.value, textoData, idAnotacao]
        localStorage.setItem(`anotacao ${idAnotacao}`, JSON.stringify(anotacaoInfo))
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