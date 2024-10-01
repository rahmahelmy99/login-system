// & html elements]
var registerPage =document.querySelector(".register-page")
var regsName = document.querySelector('#regsName')
var regsEmail = document.querySelector('#regsEmail')
var regsPass = document.querySelector('#regsPass')
var registerBtn = document.querySelector('#registerBtn')
var errorP = document.querySelector('.error')
var successP = document.querySelector('.success')
var existEmail= document.querySelector('.existEmail')

var loginPage =document.querySelector('.login-page')
var logEmail = document.querySelector('#logEmail')
var logPass = document.querySelector('#logPass')
var logBtn = document.querySelector('#logBtn')

var welcomePage= document.querySelector('.welcome-page')
var signUp=document.querySelector('.signUp')
var signIn=document.querySelector('.signIn')
var logoutBtn=document.querySelector('.logoutBtn')
var loginError =document.querySelector('.loginError')

var userName=document.querySelector('.userName')
console.log(userName)

var users =[]

// ~ app variables
var nameRegex =/^[A-za-z\s]{3,}$/
var emailRegex =/^(\w)+@(gmail|yahoo)\.com$/
var passRegex = /^[A-Za-z0-9]{5,}$/


localStorage.getItem('users') ? users = JSON.parse(localStorage.getItem('users')) : users=[]

function register(){
    var user={  
        name:regsName.value,
        email:regsEmail.value,
        pass:regsPass.value
    }
    if (users.length == 0){
        users.push(user)
        localStorage.setItem('users',JSON.stringify(users))
    }else{
        checkEmailExist(user)
    }
}
function detectEmail(detectEmail){
    for(var i = 0; i< users.length; i++){
        if(regsEmail.value !== users[i].email){
            existEmail.classList.add("d-none")
            existEmail.classList.remove("d-block")
        }else{
            existEmail.classList.remove("d-none")
            existEmail.classList.add("d-block")
        }
    }
}
function detectLog(detected){
    console.log(logEmail,logPass)
    for(var i = 0; i< users.length; i++){
        if(logEmail.value == users[i].email && logPass.value == users[i].pass){
            loginError.classList.add("d-none")
            loginError.classList.remove("d-block")
        }
    }
}
function checkEmailExist(user){
        for(var i = 0; i< users.length; i++){
            if(user.email === users[i].email){
                existEmail.classList.remove("d-none")
                existEmail.classList.add("d-block")
                break
            }else if(user.email !== users[i].email){
                if (i==users.length -1){
                    users.push(user)
                    localStorage.setItem('users',JSON.stringify(users))
                    // ^ go to login page 🔽
                    loginPage.classList.remove("d-none")
                    loginPage.classList.add('d-flex')
                    registerPage.classList.remove("d-flex")
                    registerPage.classList.add('d-none')
                }
            }
        }
}


function validate(regex,element){
    if(regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.remove("d-block")
        element.nextElementSibling.classList.add("d-none")
        return true        
    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.remove("d-none")
        element.nextElementSibling.classList.add("d-block")
        return false
    }
}
function allValid(){
    if(validate(nameRegex,regsName)&&validate(emailRegex,regsEmail)&&validate(passRegex,regsPass)){
        errorP.classList.add("d-none")
        errorP.classList.remove("d-block")
        successP.classList.add("d-block")
        successP.classList.remove("d-none")
        return true
    }
    else{
        errorP.classList.remove("d-none")
        errorP.classList.add("d-block")
        successP.classList.remove("d-block")
        successP.classList.add("d-none")
        return false
    }
    
}

function logValid(){
    if(validate(emailRegex,logEmail)&&validate(passRegex,logPass)){
        errorP.classList.add("d-none")
        errorP.classList.remove("d-block")
        return true
    }
    else{
        errorP.classList.remove("d-none")
        errorP.classList.add("d-block")
        return false
    }
    
}
function login(){
    logValid()
    for(var i =0;i <users.length;i++){
        if (logEmail.value == users[i].email && logPass.value == users[i].pass){
            welcomePage.classList.remove("d-none")
            welcomePage.classList.add("d-flex")
            loginPage.classList.add("d-none")
            loginPage.classList.remove('d-flex')
            userName.innerHTML=`${users[i].name}`
            break
        }else{
            loginError.classList.remove("d-none")
            loginError.classList.add("d-block")
            detectLog(logEmail.value)
        }
    }
    clear()
}

function clear(){
    regsName.value= ''
    regsName.classList.remove("is-invalid")
    regsName.classList.remove("is-valid")
    regsEmail.value= ''
    regsEmail.classList.remove("is-invalid")
    regsEmail.classList.remove("is-valid")
    regsPass.value= ''
    regsPass.classList.remove("is-invalid")
    regsPass.classList.remove("is-valid")
    logEmail.value=''
    logPass.value=''
    logPass.classList.remove("is-invalid")
    logPass.classList.remove("is-valid")
    logEmail.classList.remove("is-invalid")
    logEmail.classList.remove("is-valid")
    loginError.classList.remove("d-block")
    loginError.classList.add("d-none")
}
signIn.addEventListener("click",function(){
    loginPage.classList.add("d-flex")
    loginPage.classList.remove('d-none')
    registerPage.classList.add("d-none")
    registerPage.classList.remove('d-flex')
})

signUp.addEventListener("click",function(){
    registerPage.classList.remove("d-none")
    registerPage.classList.add('d-flex')
    loginPage.classList.remove("d-flex")
    loginPage.classList.add('d-none')
})
regsName.addEventListener('input', function(){
    validate(nameRegex,regsName)
})
regsEmail.addEventListener('input', function(){
    validate(emailRegex,regsEmail)
    detectEmail(regsEmail)
})
regsPass.addEventListener('input', function(){
    validate(passRegex,regsPass)
})
logEmail.addEventListener('input', function(){
    logValid(emailRegex,logEmail)
    detectLog(logEmail.value)
})
logPass.addEventListener('input', function(){
    logValid(passRegex,logPass)
    // detectLog(logPass)
})
registerBtn.addEventListener('click',function(){
    register()
    
})

logBtn.addEventListener('click',function(){
    login()
})
logoutBtn.addEventListener("click",function(){
    welcomePage.classList.add("d-none")
    welcomePage.classList.remove("d-flex")
    loginPage.classList.remove("d-flex")
    loginPage.classList.add('d-none')
    registerPage.classList.remove("d-none")
    registerPage.classList.add('d-flex')
})