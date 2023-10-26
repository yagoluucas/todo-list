window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#nova-anotacao')
    const h1 = document.querySelector('h1')
    const p = document.querySelector('p')
    const criarAnotacao = document.querySelector('.js-submit')
    const todasAnotacoes = document.querySelector('main')
    let novoTitulo;
    let novaAnotacao;
    let corAnotacao;
    let corLetra;

    form.addEventListener('change', (event) => {
        if (event.target.classList[1] == 'js-title') {
            novoTitulo = event.target.value
        } else if (event.target.classList[1] == 'js-anotacao') {
            novaAnotacao = event.target.value
        } else if (event.target.classList[1] == 'js-cor') {
            corAnotacao = event.target.value
        } else if (event.target.classList[1] == 'js-cor-letra') {
            corLetra = event.target.value
        }
    })

    criarAnotacao.addEventListener('click', (event) => {
        event.preventDefault()
        const anotacao = document.createElement('section')
        anotacao.style.background = corAnotacao
        anotacao.style.color = corLetra
        const tituloAnotacao = document.createElement('h2')
        tituloAnotacao.textContent = novoTitulo
        const textoAnotacao = document.createElement('p')
        textoAnotacao.textContent = novaAnotacao
        anotacao.append(tituloAnotacao)
        anotacao.append(textoAnotacao)
        todasAnotacoes.append(anotacao)
    })


})