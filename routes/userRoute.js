const express=require('express');
const Route=express.Router();
const Controller=require('../controller/usercontroller');
const verify=require('../middleware/verifySingup')

Route.get('/',Controller.register);
Route.get('/home',Controller.userhomeAuth,Controller.home)
Route.post('/register/create',[verify.CheckDuplicate],Controller.register_create);
Route.get('/login',Controller.login);
Route.post('/login/create',Controller.login_create);
Route.get('/dashboard',Controller.userAuth,Controller.dashborad);
Route.get('/logout',Controller.logout);



module.exports=Route;