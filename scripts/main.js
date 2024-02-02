window.addEventListener('DOMContentLoaded', () => {
    // variaveis e verificação do localStorage para iniciar o programa:
    let quantidadeDeAnotacoes
    let idAnotacao
    let todosCheckbox
    const main = document.querySelector('main')
    const sectionApagarAnotacao = document.querySelector('.js-section-apagar-anotacao')
    const btnSectionApagarAnotacao = document.querySelectorAll('.js-section-apagar-anotacao button')
    const inputTextoAnotacao = document.querySelector('.js-texto-anotacao')
    const btnGerarAnotacao = document.querySelector('.js-btn-gerar-anotacao')
    const containerAnotacoes = document.querySelector('.js-anotacoes')
    const header = document.querySelector('header')
    const btnApagarTodasAnotacoes = document.querySelector('.js-btn-apagar-todas-anotacoes')
    const btnselecionarTodasAnotacoes = document.querySelector('.js-btn-selecionar-todos')
    const btnMarcarComoFeito = document.querySelector('.js-btn-tarefa-feita')
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
            gerarSection(infoAnotacao[0], infoAnotacao[1], infoAnotacao[2])
        })
    }
    // fim variaveis e verificação do localStorage //

    // eventos que são adicionado assim que o programa inicia:
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

    btnApagarTodasAnotacoes.addEventListener('click', () => {
        adicionarFundoRemoverAnotacao(sectionApagarAnotacao, 'Deseja apagar todas as anotações ?')
        btnSectionApagarAnotacao.forEach(btn => btn.addEventListener('click', confirmaApagarAnotacoes))
        function confirmaApagarAnotacoes() {
            switch (this.textContent) {
                case "Sim":
                    sectionApagarAnotacao.lastElementChild.classList.add("none")
                    sectionApagarAnotacao.firstElementChild.textContent = 'anotações apagadas'
                    todosCheckbox = document.querySelectorAll('.checkbox:checked')
                    let idChecbox = []
                    todosCheckbox.forEach((e) => {
                        idChecbox.push(e)
                    })
                    apagarTodasAnotacoes(idChecbox)
                    setTimeout(() => {
                        removerFundoApagarAnotacao(sectionApagarAnotacao)
                    }, 1700)
                    break
                case "Não":
                    removerFundoApagarAnotacao(sectionApagarAnotacao)
                    break
            }
            btnSectionApagarAnotacao.forEach(btn => btn.removeEventListener('click', confirmaApagarAnotacoes))
            verificarChecbox()
        }
    })

    btnselecionarTodasAnotacoes.addEventListener('click', () => {
        todosCheckbox = document.querySelectorAll('.checkbox')
        todosCheckbox.forEach((e) => {
            if(!(e.parentElement.classList.contains('anotacao-feita')))
            e.checked = true
        })
        verificarChecbox()
    })

    btnMarcarComoFeito.addEventListener('click', () => {
        // quando entrar no site as anotações já devem estár como marcada
        todosCheckbox = document.querySelectorAll('.checkbox:checked')
        todosCheckbox.forEach((e) => {
            let anotacaoDesmarcar = JSON.parse(localStorage.getItem(`anotacao ${e.value}`))
            anotacaoDesmarcar[2] = 1
            localStorage.setItem(`anotacao ${e.value}`, JSON.stringify(anotacaoDesmarcar))
            e.parentElement.classList.add('anotacao-feita')
            e.disabled = true
            e.checked = false
        })
        verificarChecbox()
    })
    // fim dos eventos //

    // funcões gerais do programa:
    function gerarSection(textoAnotacao, idAnotacao, marcadoComoFeito) {
        const checkboxAnotacao = document.createElement('input')
        checkboxAnotacao.classList.add('checkbox')
        checkboxAnotacao.setAttribute('type', 'checkbox')
        checkboxAnotacao.setAttribute('value', idAnotacao)
        checkboxAnotacao.addEventListener('click', verificarChecbox)
        const sectionAnotacao = document.createElement('section')
        sectionAnotacao.classList.add('section-anotacao')
        sectionAnotacao.setAttribute('data-idAnotacao', idAnotacao)
        const paragrafoAnotacao = document.createElement('p')
        paragrafoAnotacao.textContent = textoAnotacao
        paragrafoAnotacao.classList.add('anotacao')
        let imgLixeira = document.createElement('img')
        imgLixeira.setAttribute('src', './image/lixeira.svg')
        imgLixeira.setAttribute('alt', 'lixeira')
        imgLixeira.classList.add('img-lixeira', 'js-img-lixeira')
        if(marcadoComoFeito == 1) {
            sectionAnotacao.classList.add('anotacao-feita')
            checkboxAnotacao.checked = false
            checkboxAnotacao.disabled = true
        }
        sectionAnotacao.appendChild(paragrafoAnotacao)
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
                        removerFundoApagarAnotacao(sectionApagarAnotacao)
                    }, 1300)
                    break
                case "Não":
                    removerFundoApagarAnotacao(sectionApagarAnotacao)
                    break
            }
        }

        adicionarFundoRemoverAnotacao(sectionApagarAnotacao, 'Deseja Realmente apagar a anotação ?')
        btnSectionApagarAnotacao.forEach((btn) => btn.addEventListener('click', confirmaApagarAnotacao))

    }

    function removerFundoApagarAnotacao(containerAnotacoes) {
        containerAnotacoes.classList.add('none')
        containerAnotacoes.lastElementChild.classList.remove('none')
        document.body.classList.remove('escurecer-fundo')
        main.classList.remove('deixar-transparente')
        header.classList.remove('deixar-transparente')
    }

    function gerarAnotacao() {
        quantidadeDeAnotacoes++
        idAnotacao++
        gerarSection(inputTextoAnotacao.value, idAnotacao, 0)
        const anotacaoInfo = [inputTextoAnotacao.value, idAnotacao, 0]
        localStorage.setItem(`anotacao ${idAnotacao}`, JSON.stringify(anotacaoInfo))
        localStorage.quantidadeDeAnotacoes = quantidadeDeAnotacoes
        localStorage.setItem('ultimoId', idAnotacao)
        inputTextoAnotacao.value = ''
        btnGerarAnotacao.setAttribute('disabled', 'true')
        btnGerarAnotacao.style.cursor = 'auto'
    }

    function apagarTodasAnotacoes(checbox) {
        checbox.forEach(element => {
            const idAtual = element.getAttribute('value')
            apagarAnotacao(idAtual, element)
        });
    }

    function adicionarFundoRemoverAnotacao(containerAnotacoes, textoAnotacao) {
        document.body.classList.add('escurecer-fundo')
        main.classList.add('deixar-transparente')
        containerAnotacoes.classList.add('animacao-apagar-anotacao')
        containerAnotacoes.classList.remove('none')
        containerAnotacoes.firstElementChild.textContent = textoAnotacao
        header.classList.add('deixar-transparente')
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

    function verificarChecbox() {
        todosCheckbox = document.querySelectorAll('.checkbox:checked')
        if (todosCheckbox.length >= 1) {
            btnMarcarComoFeito.removeAttribute('disabled')
            btnApagarTodasAnotacoes.removeAttribute('disabled')
        } else {
            btnMarcarComoFeito.setAttribute('disabled', 'true')
            btnApagarTodasAnotacoes.setAttribute('disabled', 'true')
        }
    }

    // fim das funções //
})
