console.log('Client side javaScript file is loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const massage1 = document.querySelector('#one')
const massage2 = document.querySelector('#two')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    massage1.textContent = 'Loading....'
    massage2.textContent = ''

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                massage1.textContent = data.error
                massage2.textContent = ''
            } else{
                massage1.textContent = data.location
                massage2.textContent = data.forcast
            }
        })
    })

})