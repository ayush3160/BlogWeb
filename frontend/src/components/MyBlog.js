import React from "react";
import { useEffect, useState } from "react";
import { decode as atob} from "base-64";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";

export default function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(false);
  const [change,setChange] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      if (!user) {
        localStorage.removeItem("token");
        console.log(user, "Yo it is not user");
        navigate("/login");
      } else {
        setLoading(true)
        const id = user.id;
        fetch("/api/myblog/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setBlogs(data);
            setLoading(false);
          });
      }
    }else{
      alert("You are not logged In")
      navigate("/login")
    }
  }, [change]);


  const handleDelete = (id) => {
    fetch('/api/operator/delete',{
      method : "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({id : id})
    }).then((result) => {
      return result.json()
    }).then((data) => {
        setChange(!change)
    })
  }

  if(loading){
    return(
      <div style={{alignItems : "center"}}>
        <ReactLoading type="spin" color="#0000FF"
        height={100} width={50}/>
        <h1>Loading...</h1>
      </div>
    )
  }else if (blogs.length === 0) {
    return <h1>You Have not created any blogs</h1>;
  } else {
    return (
      <>
        {blogs.map((value) => {
          return (
            <div className="col-sm-7 mx-auto my-4">
              <div
                class="card"
                style={{
                  width: "45rem",
                }}
              >
                <div class="card-body" style={{ textAlign: "left" }}>
                  <div
                    style={{ display: "block", borderBottom: "1px solid grey" }}
                  >
                    <button className="btn btn-danger" style={{float : "right"}} onClick={() => {handleDelete(value._id)}}>Delete</button>
                    <h1 class="card-title" style={{ color: "red" }}>
                      {value.title.toUpperCase()}
                    </h1>
                  </div>
                  <br />
                  <h3 class="card-text" style={{ fontWeight: "lighter" }}>
                    By :- {value.author}
                  </h3>
                  <br />
                  <h5 class="card-text" style={{ fontWeight: "lighter" }}>
                    Created On - {value.date}
                  </h5>
                  <br />
                  <p class="card-text">{value.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
