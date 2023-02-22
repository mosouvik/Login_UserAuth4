const jwt=require('jsonwebtoken');

exports.authejwt=(req,res,next)=>{
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken,'souvikmondalhelowelcome@123456789',(err,data)=>{
            req.user=data
            next()
        })
    } else {
        next()
    }
}