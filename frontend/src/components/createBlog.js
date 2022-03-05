import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateBlog() {
  const { id, name } = useParams();
  const date = new Date();
  var blog = {
    authorid: id,
    author: name,
    date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    title: "",
    description: "",
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      blog.title = e.target.value;
    } else if (e.target.name === "description") {
      blog.description = e.target.value;
    }
  };

  const handlePost = () => {
    if (blog.title === "" || blog.description === "") {
      const error = document.getElementById("error");
      error.style.display = "block";
    } else {
      fetch("/api/createblog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          navigate("/home/blogs")
        });
    }
  };

  return (
    <div className="col-sm-7 mx-auto my-4">
      <div
        class="card"
        style={{
          width: "45rem",
        }}
      >
        <div class="card-body" style={{ textAlign: "center" }}>
          <div style={{ display: "block", borderBottom: "1px solid grey" }}>
            <h1 class="card-title" style={{ color: "red" }}>
              CreateBlog
            </h1>
          </div>
          <br />
          <div style={{ marginTop: "20px" }}>
            <label>Author :-</label>
            <input
              type={"text"}
              name="author"
              value={name.toUpperCase()}
              style={{ marginLeft: "30px" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Title :-</label>
            <input
              type={"text"}
              name="title"
              style={{ marginLeft: "40px" }}
              placeholder="title for blog"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Description :-</label>
            <textarea
              type={"text"}
              name="description"
              style={{ marginLeft: "20px", width: "300px", height: "150px" }}
              placeholder="Content of Blog......"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <p id="error" style={{ color: "red", display: "none" }}>
            *title and description should not be empty
          </p>
          <br />
          <button className="btn btn-primary" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
