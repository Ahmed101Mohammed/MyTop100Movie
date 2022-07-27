let header = new Headers;
header.append('Content-Type','application/json; charset=utf-8');
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

// post movie Data
const post = async(url,data)=>{
    const res = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    });
    
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }
    catch(e)
    {
        console.error('Error Post',e);
    }
}

// post userName and password:
const auth = (data)=>{
    let accessT = post('/auth',data);
    accessT.then((d)=>{
        header.append('Authorization', 'Bearer ' + d);
    })
  }

// coustom post request:
const cpost = async(url,data,h)=>{
    console.log(h);
    const res = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:h,
        body: JSON.stringify(data),
    });
    
    try{
        
        console.log('Perfecto')
    }
    catch(e)
    {
        console.error('Error Post',e);
    }
}
// post movie data to /love url
const postLovelyMovie = (data)=>{
    cpost('/love',data,header);
}