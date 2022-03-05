const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  authorid : {
    type: String,
    required: true,
  },
  author : {
      type : String,
      required : true
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
