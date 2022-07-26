// getMovies fetching api:
const getMovies = async(url,path,key)=>{
    let data = await fetch(url+path+key);

    try{
        let res = await data.json();
        clearData(res)
        return res;
    }
    catch(e)
    {
        console.error('fetching error',e);
    }
}

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
const getAll = (url,discoversLinks,key)=>{
    for(let i of discoversLinks)
    {
        getMovies(url,i,key);
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
                <div id=${i._id} class="movie-container">
                    <div class="movies__movie">
                        <img src="${httpStart+i.poster_path}" alt="${i.title}">
                        <div class="rate">
                            ${i.vote_average}<sup>%</sup>
                        </div>
                        <i class="fa-solid fa-heart not-fav"></i>
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
    addHeart();
    
}

// Add heart events:
const addHeart = ()=>{
    var heartIcons = document.querySelectorAll('.fa-heart');

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
} 


