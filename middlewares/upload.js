module.exports = async (req,res,next) => {
    console.log(req.files)
    try{
        next()
    }catch(error){

    }
}