const express = require('express');
const router = express();
const Blog = require('../models/blog');

router.get("/add-blog", (req, resp) => {
    const blog = new Blog({
        title: "米斯特吴",
        snippet: "专注于前端开发",
        body: "课程有很多"
    })

    blog.save()
        .then(result => {
            resp.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/all-blogs', (req, resp) => {
    Blog.find().sort({createAt: -1})
        .then(blogs => resp.render('index', {title: '所有博客', blogs: blogs}))
        .catch(err => console.log(err))
})

router.get("/", (req, resp) => {
    // const blogs = [
    //     {title: "Vue.js快速学习指南", snippet: "使用范围最广,学习人数最多的框架"},
    //     {title: "React.js快速学习指南", snippet: "使用范围最广,学习人数最多的框架"},
    //     {title: "Node.js快速学习指南", snippet: "使用范围最广,学习人数最多的框架"}
    // ];
    // resp.render("index", {title: "首页", blogs: blogs});

    resp.redirect('all-blogs')
})


router.get("/about", (req, resp) => {
    resp.render("about", {title: "关于我们"})
})

router.get("/blog/create-page", (req, resp) => {
    resp.render("create", {title: "创建博客"})
})

router.post('/blog/create', (req, resp) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => {
            resp.redirect('/all-blogs')
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/blog/:id', (req, resp) => {
    Blog.findById(req.params.id)
        .then(result => resp.render('detail', {blog: result, title: '博客详情'}))
        .catch(err => console.log(err))
})

router.delete('/blog/delete/:id', (req, resp) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => resp.json({redirect: '/all-blogs'}))
        .catch(err => console.log(err))
})

module.exports = router;
