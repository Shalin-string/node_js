const getNamebyCom = (req,res) =>{
   
    res.json({message:`${req.params.name} from ${req.params.cmp}`})
    
}

module.exports = {
    getNamebyCom
}