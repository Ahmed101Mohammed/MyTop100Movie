let header = new Headers;
header.append('Content-Type','application/json; charset=utf-8');
// getMovies fetching api:
const getMovies = async(url,path,key)=>{
    let data = await fetch(url+path+key);
    console.log({data})
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
// 
const getRefreshTocken = async()=>{
    let d = await fetch('/refresh').then(async(d)=>{
        try{
            let dataAccess = await d.json(); 
            console.log({dataAccess:dataAccess.access});
            header.delete('Authorization');
            console.log('auth deleted')
            header.set('Authorization', 'Bearer ' + dataAccess.access);
            console.log('New Auth',header.get('Authorization'))
            
        }
        catch(e)
        {
            console.error('You need to sign in {e}:',e)
            header.delete('Authorization');
        }
    })
    

    try{
        console.log('You had a new access token')
    }
    catch(e)
    {
        console.error(`field to get a new Access token e: ${e}`)
    }
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
    console.log('res',{res});
    let accesing = true;
    if(res.status === 401)
    {
        // out put box of sign in login to login:
        console.log('you Should sign in')
        accesing = false;
    }
    
    if(res.status === 301 && accesing === true)
    {
        await getRefreshTocken()
        
        console.log('newHeader:',header.get('Authorization'))  
        cpost(url,data,header);
        
    
        
    }

    try{
              
        console.log('Perfecto')
    }
    catch(e)
    {
        console.error(`You are't log in, or your Access tocken is finneshed`,e);
    }
}
// post movie data to /love url
const postLovelyMovie = (data)=>{
    cpost('/love',data,header);
}