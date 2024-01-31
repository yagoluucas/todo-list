window.addEventListener('DOMContentLoaded', () => {
    let quantidadeDeAnotacoes
    let idAnotacao
    const main = document.querySelector('main')
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')

    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const containerAnotacoes = document.querySelector('.js-anotacoes')
    const header = document.querySelector('header')
    const btnApagarTodasAnotacoes = document.querySelector('.js-btn-apagar-todas-anotacoes')
    btnApagarTodasAnotacoes.addEventListener('click', () => {
        const todosCheckbox = document.querySelectorAll('.checkbox:checked')
        let idChecbox = []
        // console.log()
        todosCheckbox.forEach((e) => {
            idChecbox.push(e)
        })
        apagarTodasAnotacoes(idChecbox)
    })

    if (localStorage.getItem('idsAnotacao') == null || localStorage.getItem('quantidadeDeAnotacoes') == null) {
        quantidadeDeAnotacoes = 0
        idAnotacao = 0
        localStorage.setItem('idsAnotacao', JSON.stringify([]))
    } else {
        idAnotacao = JSON.parse(localStorage.getItem('ultimoId'))
        quantidadeDeAnotacoes = JSON.parse(localStorage.getItem('quantidadeDeAnotacoes'))
        const anotacoes = JSON.parse(localStorage.getItem('idsAnotacao'))
        anotacoes.forEach((id) => {
            let infoAnotacao = JSON.parse(localStorage.getItem(`anotacao ${id}`))
            gerarSection(infoAnotacao[0], infoAnotacao[1])
        })
    }

    function gerarSection(textoAnotacao, idAnotacao) {
        const checkboxAnotacao = document.createElement('input')
        checkboxAnotacao.classList.add('checkbox')
        checkboxAnotacao.setAttribute('type', 'checkbox')
        checkboxAnotacao.setAttribute('value', idAnotacao)
        const sectionAnotacao = document.createElement('section')
        sectionAnotacao.classList.add('section-anotacao')
        sectionAnotacao.setAttribute('data-idAnotacao', idAnotacao)
        const paragrafoAnotacao = document.createElement('p')
        paragrafoAnotacao.textContent = textoAnotacao
        paragrafoAnotacao.classList.add('anotacao')
        sectionAnotacao.appendChild(paragrafoAnotacao)
        let imgLixeira = document.createElement('img')
        imgLixeira.setAttribute('src', './image/lixeira.svg')
        imgLixeira.setAttribute('alt', 'lixeira')
        imgLixeira.classList.add('img-lixeira', 'js-img-lixeira')
        sectionAnotacao.appendChild(imgLixeira)
        sectionAnotacao.insertBefore(checkboxAnotacao, paragrafoAnotacao)
        containerAnotacoes.insertBefore(sectionAnotacao, containerAnotacoes.firstChild)
        imgLixeira.addEventListener('click', confirmarExclusao)
        let arrayComId = JSON.parse(localStorage.getItem('idsAnotacao'))
        if (!(arrayComId.includes(idAnotacao))) {
            arrayComId.push(idAnotacao)
        }
        localStorage.setItem('idsAnotacao', JSON.stringify(arrayComId))
    }

    function confirmarExclusao(lixeiraClicada) {
        function confirmaApagarAnotacao() {
            btnSectionApagarAnotacao.forEach((btn) => btn.removeEventListener('click', confirmaApagarAnotacao))
            switch (this.textContent) {
                case "Sim":
                    let idAnotacaoRemovida = lixeiraClicada.target.parentElement.getAttribute('data-idAnotacao')
                    apagarAnotacao(idAnotacaoRemovida, lixeiraClicada.target)
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
        gerarSection(inputTextoAnotacao.value, idAnotacao)
        const anotacaoInfo = [inputTextoAnotacao.value, idAnotacao]
        localStorage.setItem(`anotacao ${idAnotacao}`, JSON.stringify(anotacaoInfo))
        localStorage.quantidadeDeAnotacoes = quantidadeDeAnotacoes
        localStorage.setItem('ultimoId', idAnotacao)
        inputTextoAnotacao.value = ''
        btnGerarAnotacao.setAttribute('disabled', 'true')
        btnGerarAnotacao.style.cursor = 'auto'
    }

    inputTextoAnotacao.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            e.preventDefault()
            gerarAnotacao()
        }
    })

    inputTextoAnotacao.addEventListener('keyup', () => {
        if (inputTextoAnotacao.checkValidity()) {
            btnGerarAnotacao.style.cursor = 'pointer'
            btnGerarAnotacao.addEventListener('click', gerarAnotacao)
            btnGerarAnotacao.removeAttribute('disabled')
        } else {
            btnGerarAnotacao.style.cursor = 'auto'
            btnGerarAnotacao.setAttribute('disabled', 'true')
            btnGerarAnotacao.removeEventListener('click', gerarAnotacao)
        }
    })

    function apagarTodasAnotacoes(checbox) {
        checbox.forEach(element => {
            const idAtual = element.getAttribute('value')
            apagarAnotacao(idAtual, element)
        });
    }


    function apagarAnotacao(idAnotacaoRemovida, lixeiraClicado) {
        let idsAnotacoes = JSON.parse(localStorage.getItem('idsAnotacao'))
        idsAnotacoes.splice(idsAnotacoes.indexOf(+idAnotacaoRemovida), 1)
        localStorage.setItem('idsAnotacao', JSON.stringify(idsAnotacoes))
        if (+localStorage.getItem('quantidadeDeAnotacoes') >= 1) {
            quantidadeDeAnotacoes--
            localStorage.setItem('quantidadeDeAnotacoes', quantidadeDeAnotacoes)
        }
        containerAnotacoes.removeChild(lixeiraClicado.parentElement)
        localStorage.removeItem(`anotacao ${idAnotacaoRemovida}`)
    }
})