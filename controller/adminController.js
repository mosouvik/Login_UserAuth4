const User=require('../model/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const login=(req,res)=>{
    
 res.render('./admin/login',{
    
 })
}

const loginauth=(req,res)=>{
    User.findOne({
        email: req.body.email
    }, (err, data) => {

        if (data) {
            const haspassword = data.password
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, 'souvikmondalhelowelcome@123456789', { expiresIn: '5m' })
                res.cookie('userToken', token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data, "Admin login successfully");
                res.redirect('/admin/dashboard')
            } else {
                console.log("password incorect");
                // req.flash('message2', "Password Incorrect")
                res.redirect('/admin/')
            }

        } else {
            console.log("invalid email");
            // req.flash('message2', "No User found with thet email")
            res.redirect('/admin/')
        }
    })
}

const dashboard=(req,res)=>{
    if (req.user) {
        User.find({}, function (err, userdetails) {
            if (!err) {
                res.render('./admin/dashboard', {
                    data: req.user,
                    detail: userdetails
                })
            } else {
                console.log(err);
            }
        })
    }
}

const register = (req, res) => {
    res.render('./admin/register', {
        // message2: req.flash('message2'),
        // data:User.find()

    })
}

const register_create = (req, res) => {
    User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, data) => {
        if (!err) {
            console.log("user added successfully...");
            // req.flash('message', "User Register successfully")
            res.redirect('/admin/');
        } else {
            // req.flash('message2', " Please fill out this field -First Fill up Then Register")
            console.log(err, "user not added");
            res.redirect('/admin/register')
        }
    })
}


const adminAuth=(req,res,next)=>{
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user);
        res.redirect('/admin/')
    }
}

const logout=(req,res)=>{
    res.clearCookie('userToken')
    res.redirect('/admin/')
}

module.exports={
    login,
    loginauth,
    dashboard,
    register,
    register_create,
    logout,
    adminAuth
    
}