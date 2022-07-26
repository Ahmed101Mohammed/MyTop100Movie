const getMovies = async(url,path,key)=>{
    let data = await fetch(url+path+key);

    try{
        let res = await data.json();
        console.log(res);
        return data;
    }
    catch(e)
    {
        console.error('fetching error',e);
    }
}

module.exports = getMovies;