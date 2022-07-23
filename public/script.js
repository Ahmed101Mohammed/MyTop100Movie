var heartIcons = document.querySelectorAll('.fa-heart');
var moviesItems = document.querySelectorAll('.movies__item');

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
