var heartIcons = document.querySelectorAll('.fa-heart');
var moviesItems = document.querySelectorAll('.movies__item');
var backDrop = document.querySelector('.backdrop');
var loginForm = document.querySelector('.login-box');
var loginButton = document.querySelector('.login-button');
var loginNav = document.querySelector('.main-nav__enter__login');

loginButton.addEventListener('click', function(){
  let userNameInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');
  let userName = userNameInput.value;
  let pwd = passwordInput.value;
  auth({userName,pwd})
  //closeLoginForm();
  //closeBackdrop();
});
backDrop.addEventListener('click',()=>{
  closeBackdrop()
  closeLoginForm()
})
loginNav.addEventListener('click', function(){
  openBackdrop();
  openLoginForm();
});

function openBackdrop(){
  backDrop.classList.remove('close');
}

function closeBackdrop() {
  backDrop.classList.add('close');
}

function openLoginForm(){
  loginForm.classList.remove('close');
}

function closeLoginForm() {
  loginForm.classList.add('close');
}
