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
const clearData = (data)=>{
    
    let id = 0;
    for(let i of data.results)
    {
        let movie = {
            _id: id,
            title: i.original_title,
            poster_path: i.poster_path,
            vote_average: i.vote_average,
            vote_count: i.vote_count
        }
        if(!search(movie,moviesData))
        {
            moviesData.push(movie);
            id++;
        }
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

