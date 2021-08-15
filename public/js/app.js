
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })

// })

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()        // submite dabane pe refresh nahi hoga ab
    const location=search.value   //value of search varible
    messageOne.textContent='Loading.......'
    messagetwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error

        }
        else{
            messageOne.textContent=data.location
            messagetwo.textContent=data.forecast
        }
    })
})
})
