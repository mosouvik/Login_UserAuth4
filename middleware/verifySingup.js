const { exec } = require('child_process');
const usermodel=require('../model/user');

exports.CheckDuplicate=(req,res,next)=>{
    usermodel.findOne({
        email:req.body.email
    }).exec((err,email)=>{
        if (err) {
            console.log(err);
            return 
        }
        if (email) {
            req.flash('message2',"User already exist")
            return res.redirect('/')
        }

        const password=req.body.password
        const confirm=req.body.cpassword
        if (password !== confirm) {
            req.flash('message2',"Password & Confirm password are not matched")
            return res.redirect('/')
        }
        next();
    })
}