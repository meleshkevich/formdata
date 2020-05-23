'use strict'
// Form
 
let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вам свяжемся!',
    failure: 'Что-то пошло не так...'
};
let form = document.querySelector('.main-form'),
   input = form.getElementsByTagName('input'),
   statusMessage = document.createElement('div');

//    console.log(form);
//    console.log(input);

   statusMessage.classList.add('status');

   form.addEventListener('submit', function(event) {
       event.preventDefault();
       form.appendChild(statusMessage);

       let request = new XMLHttpRequest();
       request.open('POST', 'server.php');
       request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

       let formData = new FormData(form); 

       let obj = {};                            // FormData  -> JSON format 
       formData.forEach(function(value, key){
           obj[key] = value;
       }); 
       let json = JSON.stringify(obj);

       request.send(json);
       
       request.addEventListener('readystatechange', function() {
           if(request.readyState < 4) {
               statusMessage.innerHTML = message.loading;
           } else if(request.readyState === 4 && request.status == 200) {
               statusMessage.innerHTML = message.success;
           } else {
            statusMessage.innerHTML = message.failure;
           }
       });
        for (let i = 0; i  < input.length; i++) { // to clean the input form
            input[i].value = '';
        }
   });
 