const express = require ("express")

const api=require("./api.js")
const app=express.Router()

app.get("/Posts/get-all-blog-posts", function(req,res){
    api.getAllBlogPosts(function(apiResponse){
        res.json(apiResponse)
    })
})
app.get("/Posts/get-blog-posts-by-tag", function(req, res) {
    api.getBlogPostsByTag(req.query.tag, function(apiResponse) {
      res.json(apiResponse)
    })
  })

  app.get("/Posts/get-three-newest-posts", function(req, res) {
    api.getThreeNewestPosts(function(apiResponse) {
      res.json(apiResponse)
    })
  })

  app.get("/posts/get-blog-post-by-url-title", function(req, res) {
    api.getBlogPostByUrlTitle(req.query.urlTitle, function(apiResponse) {
      res.json(apiResponse)
    })
  })
module.exports=app