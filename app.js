const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

const dbURI = "mongodb://localhost:27017/eblog"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

app.set("view engine", "ejs");

app.use(blogRoutes)

app.use(express.static("public"));
app.use(morgan("tiny"));

app.use(express.urlencoded({extended: true}))


app.use((req, resp) => {
    resp.status(404).render("404", {title: "404"})
})

