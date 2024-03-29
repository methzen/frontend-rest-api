const express = require("express")

const api = require("./api.js")

const authAdminUser = require("../../middlewares/index.js").authAdminUser

const app = express.Router()

// ADD API ENDPOINT CODE HERE
app.get("/blog-posts/get-all", authAdminUser, function(req, res) {
    if (!res.locals.authSuccess) {
      res.json({authSuccess: false})
    } else {
      api.getAllBlogPosts(function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      })
    }
  })

app.post("/blog-posts/create-new", authAdminUser, function(req, res) {
    if (
      !req.body.title ||
      !req.body.urlTitle ||
      !req.body.dateTimestamp ||
      !req.body.tags ||
      !req.body.markdownContent ||
      !req.body.seoTitleTag ||
      !req.body.seoMetaDescription
    ) {
      res.json({submitError: false})
    } else if (!res.locals.authSuccess) {
      res.json({authSuccess: false})
    } else {
      api.createNewBlogPost(
        req.body.title,
        req.body.urlTitle,
        req.body.dateTimestamp,
        req.body.tags,
        req.body.thumbnailImageUrl,
        req.body.markdownContent,
        req.body.seoTitleTag,
        req.body.seoMetaDescription,
        function(apiResponse) {
          apiResponse.authSuccess = true
          res.json(apiResponse)
        }
      )
    }
  })

  app.get("/blog-posts/get-post-by-id", authAdminUser, function(req, res) {
    if (!req.query.id) {
      res.json({notFoundError: false})
    } else if (!res.locals.authSuccess) {
      res.json({authSuccess: false})
    } else {
      api.getBlogPostById(req.query.id, function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      })
    }
  })

  app.put("/blog-posts/edit", authAdminUser, function(req, res) {
    if (
      !req.body.id ||
      !req.body.title ||
      !req.body.urlTitle ||
      !req.body.dateTimestamp ||
      !req.body.tags ||
      !req.body.markdownContent ||
      !req.body.seoTitleTag ||
      !req.body.seoMetaDescription
    ) {
      res.json({submitError: false})
    } else if (!res.locals.authSuccess) {
      res.json({authSuccess: false})
    } else {
      api.editBlogPost(
        req.body.id,
        req.body.title,
        req.body.urlTitle,
        req.body.dateTimestamp,
        req.body.tags,
        req.body.thumbnailImageUrl,
        req.body.markdownContent,
        req.body.seoTitleTag,
        req.body.seoMetaDescription,
        function(apiResponse) {
          apiResponse.authSuccess = true
          res.json(apiResponse)
        }
      )
    }
  })

  app.put("/blog-posts/delete", authAdminUser, function(req, res) {
    if (!req.body.id) {
      res.json({success: false})
    } else if (!res.locals.authSuccess) {
      res.json({authSuccess: false})
    } else {
      api.deleteBlogPost(req.body.id, function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      })
    }
  })
module.exports = app