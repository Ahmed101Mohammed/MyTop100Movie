var heartIcons = document.querySelectorAll('.fa-heart');
var moviesItems = document.querySelectorAll('.movies__item');
var backDrop = document.querySelector('.backdrop');
var loginForm = document.querySelector('.login-box');
var loginButton = document.querySelector('.login-button');
var loginNav = document.querySelector('.main-nav__enter__login');

for (let i=0; i<heartIcons.length; i++){
  heartIcons[i].addEventListener('click', function(){
    if (heartIcons[i].classList.contains('favourite')) {
        heartIcons[i].classList.remove('favourite');
        heartIcons[i].classList.add('not-fav');
    } else {
        heartIcons[i].classList.add('favourite');
        heartIcons[i].classList.remove('not-fav');
  }});
}

for (let i=0; i<moviesItems.length; i++){
  moviesItems[i].addEventListener('click', function(){
    if (!moviesItems[i].classList.contains('selected')) {
        for (let j=0; j<moviesItems.length; j++){
          if (moviesItems[j].classList.contains('selected')){
            moviesItems[j].classList.remove('selected');
            moviesItems[j].classList.add('not-selected');
            break;
          };
        }
        moviesItems[i].classList.add('selected');
        moviesItems[i].classList.remove('not-selected');
  }});
}

backDrop.addEventListener('click', function(){
  if (loginForm) {
    closeLoginForm();
  }
  closeBackdrop();
});

loginButton.addEventListener('click', function(){
  closeLoginForm();
  closeBackdrop();
});

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
