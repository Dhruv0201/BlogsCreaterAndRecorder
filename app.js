const express = require("express");
const bodyParser = require("body-parser");
const ejs  = require("ejs");
const mongoose = require("mongoose");
const _ =require("lodash")

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac nulla quam. Phasellus pharetra mi sit amet feugiat cursus. In auctor consectetur sem, at dignissim";
const aboutStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac nulla quam. Phasellus pharetra mi sit amet feugiat cursus. In auctor consectetur sem, at dignissim";
const contactStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac nulla quam. Phasellus pharetra mi sit amet feugiat cursus. In auctor consectetur sem, at dignissim";
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/blogs",{useNewUrlParser:true},{useUnifiedTopology: true} );

const blogSchema={
    title:String,
    content:String
}
const Blog =mongoose.model("Blog",blogSchema);


app.get('/',function(req,res){
    Blog.find({},function(err,blogs){
        res.render("home",{first:homeStartingContent,
            posts:blogs});
            });
})  

app.get('/about',function(req,res){
    res.render("about",{about:aboutStartingContent})
});
app.get('/contact',function(req,res){
    res.render("contact",{contact:contactStartingContent})
});
app.get('/compose',function(req,res){
    res.render("compose")
});

app.post('/compose',function(req,res){
    const blog= new Blog({
        title:req.body.input,
        content:req.body.content
    })
    blog.save(function(err){
        if(!err){
            res.redirect("/");
        }
    })
    
})
app.get('/posts/:postId',function(req,res){
   const requestedPostId = req.params.postId;
   Blog.findOne({_id: requestedPostId},function(err,post){
    res.render("post",{
        title:post.title,
        content:post.content
    })
   })
})

app.listen(3000,function(){
    console.log("server is listening");
})