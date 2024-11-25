
let inputVal = 0
const spans = document.getElementsByClassName('rate-circle') ;
const submitButton = document.getElementById('submitButton') 
const results = document.getElementById("results")
const ratingCard = document.getElementById("ratingCard")
const thanksCard = document.getElementById("thanksCard")

addEventListener('click',(e)=>{
    if(e.target.nodeName === 'SPAN'){
    inputVal =  e.target.innerText;
    results.innerText = `You selected ${inputVal} out of 5`
    Array.from(spans).forEach(span => {
        span.classList.remove('on')
    });
    e.target.classList.toggle('on')
    }
})

submitButton.addEventListener('click',()=>{
if(inputVal === 0 ){
    alert('please choose a number out of 5!')
}
ratingCard.style.display = 'none'
thanksCard.style.display = 'flex'
})
