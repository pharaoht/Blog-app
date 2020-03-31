var bodyParser  = require("body-parser"),
methodOverride  = require("method-override"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();
//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))
//mongoose model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//Restful ROutes
app.get("/", function(req, res){
  res.redirect("/blogs")
});
//Index route
app.get("/blogs", function(req, res){
  Blog.find({},function(err, blogs){
    if(err){
      console.log("Oops, something went wrong");
    }
    else{
        res.render("index", {blogs: blogs})
    }
})
});

//New Route
app.get("/blogs/new", function(req, res){
  res.render("new");
})
//Create Route
app.post("/blogs", function(req, res){
  var title = req.body.title;
  var image = req.body.image;
  var body = req.body.body;
  var newBlog = {title: title, image: image, body: body}
  Blog.create(newBlog, function(err, newBlogs){
    if(err){
      res.render("new");
    }else{
      res.redirect("/blogs");
    }
  })
})

//Show Routes
app.get("/blogs/:id", function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      console.log("Something went wrong")
    }else{
      res.render("show", {blog: foundBlog});
    }
  })
})

//Edit Route
app.get("/blogs/:id/edit", function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
           }
    else{
      res.render("edit", {blog: foundBlog})
        }
  })
})
//Update
app.put("/blogs/:id", function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs")
    }
    else{
      res.redirect("/blogs/" + req.params.id);
    }
  })
})

//Delete Route
app.delete("/blogs/:id", function(req, res){
  res.send("This page will be destroyed")
})


var server = app.listen(4040, function() {
    console.log('The server is up and running CAPTAIN on port %d', server.address().port);
});
