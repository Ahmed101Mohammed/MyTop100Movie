const readReq = (req,res,nex)=>{
    console.log('from readReq',req.url);
    nex();
}

module.exports = readReq;