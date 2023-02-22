const express=require('express');
const Route=express.Router();
const AdminController=require('../controller/adminController');


Route.get('/',AdminController.login);
Route.post('/logiauth',AdminController.loginauth)
Route.get('/register',AdminController.register)
Route.post('/registercrate',AdminController.register_create)
Route.get('/dashboard',AdminController.adminAuth,AdminController.dashboard);
Route.get('/logout',AdminController.logout);



module.exports=Route;