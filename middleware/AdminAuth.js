var secret = "dae3bd97-f27c-46fa-a57f-eb893a0ae941";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        try{          
            if(authToken === secret){
                next();
            }
        }catch(err){
            console.log(err);
            res.status(403);
            res.send("Você não está autenticado");
            return;
        }
    }else{
        res.status(401);
        res.send("Você não está autenticado");
        return;
    }
}