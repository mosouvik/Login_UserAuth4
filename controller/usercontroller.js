const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const home=(req,res)=>{
//     res.render('home',{
//         data:User.find()
//     })
// }

const home = (req, res) => {
    if (req.user) {
        User.find({}, function (err, userdetails) {
            if (!err) {
                res.render('home', {      
                  data:req.user  
                })
            } else {
                console.log(err);
            }
        })
    }

}

const register = (req, res) => {
    res.render('register', {
        message2: req.flash('message2'),
        data:User.find()

    })
}

const register_create = (req, res) => {
    User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, data) => {
        if (!err) {
            // console.log("user added successfully...");
            req.flash('message', "User Register successfully")
            res.redirect('/login');
        } else {
            req.flash('message2', " Please fill out this field -First Fill up Then Register")
            console.log(err, "user not added");
            res.redirect('/register')
        }
    })
}

const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login', {
        message: req.flash('message'),
        message2: req.flash('message2'),

        data: loginData,
    })
}

const login_create = (req, res) => {
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
                console.log(data, "login successfully");
                res.redirect('/dashboard')
            } else {
                // console.log("password incorect");
                req.flash('message2', "Password Incorrect")
                res.redirect('/login')
            }

        } else {
            // console.log("invalid email");
            req.flash('message2', "No User found with thet email")
            res.redirect('/login')
        }
    })
}

const dashborad = (req, res) => {
    if (req.user) {
        User.find({}, function (err, userdetails) {
            if (!err) {
                res.render('dashboard', {
                    data: req.user,
                    detail: userdetails
                })
            } else {
                console.log(err);
            }
        })
    }

}

const userAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user);
        req.flash('message2', "Can not access this page  -- First login then access this page ")
        res.redirect('/login')
    }
}


const userhomeAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user);
        req.flash('message2', "Can not access this page  -- First register then login then access this page ")
        res.redirect('/')
    }
}    

        
    

const logout = (req, res) => {
    res.clearCookie('userToken')
    res.redirect('/login')
}

module.exports = {
    home,
    register,
    register_create,
    login,
    login_create,
    dashborad,
    userAuth,
    logout,
    userhomeAuth
}