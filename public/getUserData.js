getUserData('/mylist',header);

// Generate Movies
const genarateMovies = (data)=>{
    let httpStart = 'https://image.tmdb.org/t/p/w500';
    let movieContainer = document.querySelector('.section-body');
    
    let content = '';
        
    for(let i of data)
    {
        let item = `
                <div class="movie-container">
                    <div class="movies__movie">
                        <img src="${httpStart+i.poster_path}" alt="${i.title}">
                        <div class="rate">
                            ${i.vote_average}<sup>%</sup>
                        </div>
                        <i id=${i._id} class="fa-solid fa-heart not-fav"></i>
                    </div>
                    <div class="details">
                        <h1 class="movie-name">${i.title}</h1>
                        <p class="movie-date">${i.date}</p>
                    </div>
                </div>
            `;
        content += item;
        
    };

    movieContainer.innerHTML = content;
    addHeart(data);
    
}

// Add heart events:
const addHeart = (d)=>{
    var heartIcons = document.querySelectorAll('.fa-heart');

    for (let i=0; i<heartIcons.length; i++){
    heartIcons[i].addEventListener('click', function(){
        let data = d;
        
        if (heartIcons[i].classList.contains('favourite')) {
            heartIcons[i].classList.remove('favourite');
            heartIcons[i].classList.add('not-fav');
            let movie = searchMovie(data,heartIcons[i].id);
            
        } else {
            heartIcons[i].classList.add('favourite');
            heartIcons[i].classList.remove('not-fav');
            let movie = searchMovie(data,heartIcons[i].id);
            postLovelyMovie(movie);
            console.log(movie);
            console.log(movie);
            
    }});
    }
} 