

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageUne = document.querySelector('#message-one')
const messageDeux = document.querySelector('#message-two')

messageUne.textContent = ''
messageDeux.textContent = ''

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    messageUne.textContent = 'Loading ...'
    messageDeux.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {

            if(data.error) {

                messageUne.textContent = data.error
                messageDeux.textContent = ''

            }
            else {

                messageUne.textContent = 'Location is : ' + data.location 

                messageDeux.textContent = ' and the temperature is : ' + data.temperature + ' K' + ' and it feels like : ' + data.feels_like + ' K'

            }

            

        })

    })

})