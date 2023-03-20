const form = document.querySelector('#form')
const username = form.querySelector('#username')
const password = form.querySelector('#password')
const errorElement = form.querySelector('#error')

function hideErrorMessage(){
    errorElement.innerHTML= "";
}

function showErrorMessage(message){
    errorElement.innerHTML=`<div class="alert text-danger outline-none  " role="alert">${message}</div>`
}

function submitform(e){
   
    if(email.value==="" && password.value===""){
        
        showErrorMessage("Username and Password is Required");
        return false;
    }
    if(email.value==="" ){
        
        showErrorMessage("Username is Required");
        return false;
    }
    if(password.value===""){
        
        showErrorMessage("Password is Required");
        return false;
    }
    if(email.value==="" && password.value===""){
        
        showErrorMessage("Name and Password is Required");
        return false;
    }
    if (password.value!==cpassword.value) {
        showErrorMessage("Password Mismatch");
        return false;
    }

    hideErrorMessage()
    return true;

}