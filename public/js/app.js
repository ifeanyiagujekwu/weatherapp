const weatherform = document.querySelector('#form1')
const search = document.querySelector('#input1')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherform.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value

    message1.textContent = 'loading.....'

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = 'The current temperature is '+ data.temperature +' Fahrenheit, the current pressure is '
                + data.pressure +', and the current humidity is '+ data.humidity
            }
        })
    })
})

