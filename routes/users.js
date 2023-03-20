var express = require('express');
var router = express.Router();
var userhelper = require('../helper/userhelper')
// const {userhome}=require('../middleware/usermidleware')
let mssg="";


const adobes = [
  {
    img : "/images/photoshop-logo.png",
    title: "Photoshop",
    text: "Create Beautiful Images, Graphics, Paintings,And 3D Artwork On Your Desktop And iPad. If You Can Dream It, You Can Make It With Photoshop.",
    link: 'https://www.adobe.com/in/products/photoshop.html',
  },
  {
    img : "/images/0_hzkhj0DgfV79Vouw.jpg",
    title: "Premium Pro",
    text: "Adobe Premiere Pro is a timeline-based and non-linear video editing software application developed by Adobe Inc.",
    link: 'https://www.adobe.com/in/products/premiere.html?gclid=CjwKCAiAy_CcBhBeEiwAcoMRHPP8697C0eXWCgDI7LEys01wJ_NOiEyJyKXO-zvIWPRsh2elLW1ntBoC7M0QAvD_BwE&sdid=STLMM87Z&mv=search&ef_id=CjwKCAiAy_CcBhBeEiwAcoMRHPP8697C0eXWCgDI7LEys01wJ_NOiEyJyKXO-zvIWPRsh2elLW1ntBoC7M0QAvD_BwE:G:s&s_kwcid=AL!3085!3!473191824150!e!!g!!premiere%20pro!221167988!17525565668',
  },
  {
    img : "/images/Adobe-After-Effects-1.jpg",
    title: "After Effect",
    text: "Work faster & remove bottlenecks w/new performance improvements. Join. All CC apps & more. Memberships for everyone.No internet access needed.",
    link: 'https://www.adobe.com/in/products/aftereffects.html?gclid=CjwKCAiAy_CcBhBeEiwAcoMRHCIe_vcFOAg0l8aYVPj3C7htljZxbUifseRa9eq4iuwLkNBVw4NZGBoCzh4QAvD_BwE&sdid=STLMM87Z&mv=search&ef_id=CjwKCAiAy_CcBhBeEiwAcoMRHCIe_vcFOAg0l8aYVPj3C7htljZxbUifseRa9eq4iuwLkNBVw4NZGBoCzh4QAvD_BwE:G:s&s_kwcid=AL!3085!3!248207268690!e!!g!!after%20effects!221167268!17525486948',
  },
  {
    img : "/images/Adobe-After-Effects-1.jpg",
    title: "After Effect",
    text: "Work faster & remove bottlenecks w/new performance improvements. Join. All CC apps & more. Memberships for everyone.No internet access needed.",
    link: 'https://www.adobe.com/in/products/aftereffects.html?gclid=CjwKCAiAy_CcBhBeEiwAcoMRHCIe_vcFOAg0l8aYVPj3C7htljZxbUifseRa9eq4iuwLkNBVw4NZGBoCzh4QAvD_BwE&sdid=STLMM87Z&mv=search&ef_id=CjwKCAiAy_CcBhBeEiwAcoMRHCIe_vcFOAg0l8aYVPj3C7htljZxbUifseRa9eq4iuwLkNBVw4NZGBoCzh4QAvD_BwE:G:s&s_kwcid=AL!3085!3!248207268690!e!!g!!after%20effects!221167268!17525486948',
  }
]; 

var msg="";

router.get('/', (req,res)=>{
  if(req.session.email){
    res.redirect('/home')
  }else{
    res.render('userlogin',{ msg });
    msg="";
  }
})

router.get('/signup',(req,res)=>{
  if(req.session.email){
    res.redirect('/home')}
    else{
  res.render('signup',{ mssg });}
  mssg="";
})

router.get('/home',(req,res)=>{
  console.log("hello")
  if(req.session.email){
    res.render('userhome',{adobes});
  }else{
    res.redirect('/')
  }
});

router.post('/userpost',(req,res)=>{
  userhelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.email = response.user.email;
      res.redirect('/home')
    }else{
      msg="Invalid User or Password";
      res.redirect('/');
    }
  })
})
//signup

router.post('/signin',(req,res)=>{
  userhelper.checkUser(req.body).then((response) =>{
    if(response.status){
      mssg="Email Exist Please change"
      res.redirect('/signup')
    }
    else{
      userhelper.addUser(req.body).then(()=>{
        res.redirect("/");
      })
    }
  })
})

//signout

router.get('/signout',(req,res)=>{
  req.session.email=null
  res.redirect('/')
})

module.exports = router;
