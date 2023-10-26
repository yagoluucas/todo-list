window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#nova-anotacao')
    const title = document.querySelector('.title')
    console.log(title)

    form.addEventListener('change', (event) => {
        console.log(event.target)
    })
})