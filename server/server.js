require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const findOrCreate = require("mongoose-findorcreate");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const saltRounds = 10; //Bundan sonrası çok uzun sürüyor. For more inf. check docs
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const encrypt = require("mongoose-encryption");
//app.use(bodyParser.urlencoded({extended:true})); //Bu satır form verisi işlemek için (genellikle html)
app.use(bodyParser.json()); // Bu json verisi işlemek için

app.use(session({  //That line of code must be here bottom all of requires top off mongoose.connect
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  //Bu sadece HTTPS olduğunda true değerini almalı
}));

//app.use(session());
//app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

//Güvenlik nedeniyle engellenen istekler için gerekli kod (yoksa api bilgilerini kullanamıyor)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Bu, sadece belirli bir origin'e izin verir
    res.header('Access-Control-Allow-Credentials', true); //Bu satır deserializeUser kısmını çalıştırmamı sağladı. 
    //Ancak bunun geçerli olabilmesi için axios.REQ("url", {withCredentials: true}) conf. yapmam gerekiyor.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
mongoose.connect("mongodb://127.0.0.1:27017/learnDB");
const postSchema = new mongoose.Schema({
  postTitle: String,
  postBody: String
});
const Post = new mongoose.model("Post", postSchema);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  post: [postSchema]
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy()); //new localStrategy() de yazabilirdik ama bununda otomatikleştirmiş olduk

passport.serializeUser(function(user, cb) {
  console.log("SerializeUser up to cb:" +user.id + user);
  process.nextTick(() => {return cb(null, {
    id: user.id,
    username: user.username,
    picture: user.picture
  });})
});

passport.deserializeUser(function(user, cb) {
  //User.findById(id, function(err, user) {
    //console.log("DeserializeUser:" + user + id);
      //cb(err, user)
  //});
  console.log("Deserialize user:" + user);
  process.nextTick(() => {
    return cb(null, user)
  })
});


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/secrets"
}, function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({googleId: profile.id}, function(err, user){
    return cb(err, user);
  })
}));


app.get("/auth/google", 
  passport.authenticate("google", {scope: ["profile"]})
);
//Bu get isteğini google kendisi yapıyor. 
//Benim yönlendirmem gereken yer /auth/google kısmı sadece 
//Google ise Dev. Consoledan girdiğim path'e GET isteği atıyor.
//Authorized redirect URIs /auth/google/secrets yazıldığından böyle.
app.get("/auth/google/secrets", //copied from passport docs
  passport.authenticate("google", {failureRedirect: "http://localhost:5173/register"}),
  (req,res) => {
    
    //req.session.user = req.user;
    //Successful authentication, redirect the page.
    res.redirect("http://localhost:5173/contact"); //Client path
  }
)

app.get("/api", (req, res) => {
    Post.find()
    .then((result) => {
      //console.log(result);
      res.json({"Posts":result});//result zaten bir array o yüzden bida arrayin içine almana gerek yok
    }).catch((err) => {console.log("Hataaaaa" + err);})
    // Send back a simple message to the client
    
});

app.post("/addSecretPost", (req,res) => {

  const newSecretPost = new Post({postTitle: req.body.serverTitle, postBody: req.body.serverBody});
  User.findById(req.user.id)
  .then((result) => {
    console.log("aaaaaaaaaaaa" +result);
    result.post.push(newSecretPost);
    result.save();
    res.redirect("http://localhost:5173/addSecretPost");
  }).catch((err) => console.log(err));
});


// "/addSecretPost" route with isAuthenticated middleware
app.get("/addSecretPost", (req, res) => {
  console.log("Kullanıcı:" +req.user.id + "______" + req.user._id);//_id olan undefined.
  //Ayrıca mongoDB nin kendi koyduğu ID yi kullanıyor googdleID değil.
  console.log(req.isAuthenticated());
  
  res.json({"authBoolean": req.isAuthenticated()})
  
});




app.post("/addPost", (req,res)=> {
  console.log(req.body.serverTitle); //it worked lol
  const newPost = new Post({postTitle: req.body.serverTitle, postBody: req.body.serverBody});
  newPost.save()
  .then(()=>{
    res.json({"Status":"Başarılı"})
  }).catch((err)=>{console.log(err);})
})

//Cliente rahatça veri gönderebilmek için clientin içindeki
//package.json dosyasının içine "proxy": "http://localhost:5000" satırını eklemeyi unutma
app.listen(5000, () => {console.log("Server started on port 5000")});
