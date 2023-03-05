import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer=document.querySelector('#chat_container')

let loadInterval;


function loader(element){
  element.textContent='';

  loadInterval=setInterval(()=>{
    element.textContent+= '.';

    if(element.textContent==='...'){
      element.textContent='';
    }
  },300);
}

function typeText(element,text){
  let index=0;

  let interval=setInterval(()=>{
    if (index<text.length){
      element.innerHTML+=text.charAt(index);
      index++;
    }
    else{
      clearInterval(interval);
    }
  },200)
}
function generateUniqueId(){
  const timestamp=Date.now();
  const randomNumber=Math.random();
  const hexadecimalString= randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi,value,uniqueId){
  return (
    `
    <div class='wraper ${isAi && 'ai'}">
      <div class="chat">
      <img
      src="${isAi ? bot : user}
      alt="${isAi ? 'bot': 'user'}
      />
      </div>
      <div class="message id=${uniqueId}>${value}</div>
      </div>
      </div>
    `
  )
}

handleSubmit = async (e)=>{
   e.preventDefault();

   const data= new FormData(form);

   // user's chatstripe
   chatContainer.innerHTML += chatStripe(false,data.get('prompt'));

   form.reset();

   //bot's chatstripe
   const uniqueId=generateUniqueId();
   chatContainer.innerHTML += chatStripe(true," ",uniqueId);

   chatContainer.scrollTop = chatContainer.scrollHeight;

   const messageDiv=document.getElementById(uniqueId);

   loader(messageDiv);

   // Fetch data from our API

   const response= await fetch('http://localhost:5000',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
   })
}

form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup',(e)=>{
  if (e.keyCode===13){
    
  }
})