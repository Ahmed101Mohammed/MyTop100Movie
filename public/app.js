let logOutB = document.querySelector('.logout');
//The url of TMDB:
let url = 'https://api.themoviedb.org/3';

// my Api key
let key = `&api_key=f1368dac7104e8f7e377d4047ff7ac7e`;

// discovers links:
let discoversLinks = [`/discover/movie?sort_by=popularity.desc`,
                        '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22',
                        '/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc',
                        '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc',
                        '/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc',
                        '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc',
                        '/discover/movie?with_genres=18&primary_release_year=2022',
                        '/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc',
                        '/discover/movie?with_people=287,819&sort_by=vote_average.desc',
                        '/discover/movie?with_people=108916,7467&sort_by=popularity.desc',
                        '/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10',
                        '/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896'
                    ];

// function to get the data that I want
let moviesData = [];
let id = 0;
const clearData = (data)=>{
    
    
    for(let i of data.results)
    {
        let movie = {
            _id: id,
            title: i.original_title,
            poster_path: i.poster_path || "",
            vote_average: i.vote_average,
            vote_count: i.vote_count,
            date: i.release_date
        }
        if(!search(movie,moviesData) && movie.poster_path !== '')
        {
            moviesData.push(movie);
            id++;
        }
    }
    if (moviesData.length > 170)
    {
        genarateMovies(moviesData);
    }  
    console.log(moviesData);
}

// searchin dublicated of the movies:
const search = (obj,arr)=>{
    for(let i of arr)
    {
        if(i.title === obj.title)
        {
            return true;
        }
    }
    return false;
}

// get all data:
const getAll = async (url,discoversLinks,key)=>{
    for(let i of discoversLinks)
    {
       await getMovies(url,i,key);
    }
}

getAll(url,discoversLinks,key);

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
    heartIcons[i].addEventListener('click', async function(){
        let data = d;
        
        if (heartIcons[i].classList.contains('favourite')) {

            let movie = searchMovie(data,heartIcons[i].id);
            console.log('delete Movie',movie);
            let complate = await DeleteMovie(movie);
            if(complate)
            {
                return;
            }
            heartIcons[i].classList.remove('favourite');
            heartIcons[i].classList.add('not-fav');

        } else {
            let movie = searchMovie(data,heartIcons[i].id);
            console.log(movie);
            let complete = await postLovelyMovie(movie);
            if(!complete)
            {
                return;
            }
            heartIcons[i].classList.add('favourite');
            heartIcons[i].classList.remove('not-fav');
            
    }});
    }
} 

// search about movie by id
let searchMovie = (movieList,id)=>{
    
    for(let i of movieList)
    {
        if(i._id === Number(id))
        {
            return i;
        }
    }
}


// add heart red color to user favoiret movies that already in his list:
let addRed = (data)=>{
    console.log({data})
    let allMovies = document.querySelectorAll('.movie-container');
    for(let movie of allMovies)
    {
        let title = movie.querySelector('.details').querySelector('.movie-name').textContent;
        if(searchMovieTitle(data.userMovies,title))
        {
            let heart = movie.querySelector('.movies__movie').querySelector('i');
            heart.classList.remove('not-fav');
            heart.classList.add('favourite');
        }
    }
}

// search about movie by title:
let searchMovieTitle = (movieList,title)=>{
    for(let movie of movieList)
    {
        if(movie.title === title)
        {
            return true;
        }
    }
    return false;
}

// loge out:
logOutB.addEventListener('click',async()=>{
    await logOut();
    await getAll(url,discoversLinks,key);
  })