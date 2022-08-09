let userNameInput = document.querySelector('#emailR');
let passwordInput = document.querySelector('#passwordR');
let submitBotton = document.querySelector('#newUser');

submitBotton.addEventListener('click',()=>{
   
    let userName = userNameInput.value;
    let pwd = passwordInput.value;
    let data = {userName,pwd};
    register(data);
    console.log('Done')
})