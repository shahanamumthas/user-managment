const { query, response } = require('express');
var express = require('express');
const userhelper = require('../helper/userhelper');
var router = express.Router();

const emailDB="shahana@gmail.com"
const passwordDB="12345"
// logout session


module.exports = { 
  
  sessionlogin:(req, res, next)=> {
    if(req.session.user){
      res.redirect('/admin/adminhome')
    }else{
      res.render('adminlogin');
    }
  },

  // Add user



  
  adduser:(req,res)=>{
    if(req.session.user){
    res.render('adduser')
    }else{
      res.render('adminlogin')
    }
  },

 adduserpost : (req,res) => {
    userhelper.addUser(req.body).then(() => {
    res.redirect('/admin/adminhome')
    })
  },


  adminsignout : (req,res)=>{
    req.session.user=null;
    res.redirect('/admin')
  },

  adminsearch : async(req,res) => {
    let user = await userhelper.doSearch(req.query);
    console.log(user);
    res.render('adminhome', { user , message : (user.length>0) ?null : "No user Found" })
  },

   adminhome : (req,res) => {
    if(req.session.user){
    userhelper.getUsers().then((user)=>{
    res.render('adminhome',{user})
    })
    }else{
      res.redirect('/admin')
    }
  },



   adminlogin : (req,res)=>{
    const {email ,password}=req.body;
    let user;
    if(email === emailDB && password === passwordDB){
      req.session.user=email;
      res.redirect('/admin/adminhome');
    }
    else{
        res.redirect('/admin');
    }
  },

  // Edit user

   edituser : async (req,res)=>{
    if(req.session.user){
    let user = await userhelper.getUser(req.query.id);
    res.render("edituser", { user , id:req.query.id})
    }else{
      res.redirect('/admin')
    }
  },

   editUsers :async (req,res)=>{
    console.log(req.body);
    console.log("PUT");
    userhelper.editUsers(req.body.id, req.body).then(()=>{
    if(req.session.user){
    res.redirect('/admin/adminhome')
    }
    else{
  
    }
    })
  },

  // deleteuser


   deleteuser : (req,res)=>{
    let userId = req.query.id;
    userhelper.deleteUsers(userId).then((response) =>{
    res.redirect("/admin/adminhome")
    })
  },
}
 
