const { query } = require("express");

const form = document.querySelector('#register')
const fname = form.querySelector('#fname')
const lname = form.querySelector('#lname')
const username = form.querySelector('#username')
const password = form.querySelector('#password')
const cpassword = form.querySelector('#cpassword')


function hideErrorMessage(){
    errorElement.innerHTML= "";
}

function showErrorMessage(message){
    errorElement.innerHTML=`<div class="alert text-danger bg-white " role="alert">${message}</div>`
}


function submitform(e){
   
    if(cpassword.value!==password.value){
        
        showErrorMessage("Password mismatch");
        return false;
    }

    hideErrorMessage()
    return true;

}