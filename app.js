var bodyParser  = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();
//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
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
app.get("blogs/new/", function(req, res){
  res.render("new");
})
//Create Route





var server = app.listen(4040, function() {
    console.log('The server is up and running CAPTAIN on port %d', server.address().port);
});
