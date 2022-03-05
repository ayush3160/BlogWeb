import React from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {decode as atob, encode as btoa} from 'base-64'
import ReactLoading from "react-loading";

export default function Home() {
  let navigate = useNavigate()
  const [name, setName] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [id,setID] = useState();
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
    const user = JSON.parse(atob(token.split('.')[1]));
      if(!user){
        localStorage.removeItem('token')
        console.log(user,"Yo it is not user")
        navigate("/login")
      }else{
      const id1 = user.id
      setLoading(true);
      setID(id1)
      fetch("/api/homereq/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id1 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setBlogs(data.blogs);
        setLoading(false);
      });
      // fetch("/api/homereq/allblog")
      // .then((res) => {
      //   return res.json();
      // })
      // .then((data) => {
      //   setBlogs(data);
      // });
      }
    }else{
      alert("You are not logged In")
      navigate("/login")
    }
  }, []);

  if(loading){
    return(
      <div style={{alignItems : "center"}}>
        <ReactLoading type="spin" color="#0000FF"
        height={100} width={50}/>
        <h1>Loading...</h1>
      </div>
    )
  }else {return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 my-4">
            <div class="card" style={{ width: "18rem",position : "fixed" }}>
              <img
                class="card-img-top"
                src="/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png"
                style={{ width: "100px", margin: "20px auto 10px auto" }}
                alt="not found"
              />
              <div class="card-body" style={{ textAlign: "center" }}>
                <h3 class="card-title">{name.toUpperCase()}</h3>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <br />
                <button
                  className="btn btn-primary"
                  style={{ marginTop: "10px" }}
                  onClick = {() => {navigate(`createblogs/${id}/${name}`)}}
                >
                  Create Blogs
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-7 mx-auto">
          {blogs.map((value) => {
            return (
              
                <div
                  class="card my-4"
                  style={{
                    width: "45rem",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "left" }}>
                    <div style={{display : "block",borderBottom : "1px solid grey"}}>  
                    <h1 class="card-title" style={{color : "red"}}>{value.title.toUpperCase()}</h1>
                    </div>
                    <br/>
                    <h3 class="card-text" style={{fontWeight : "lighter"}}>By :- {value.author}</h3>
                    <br/>
                    <h5 class="card-text" style={{fontWeight : "lighter"}}>Created On - {value.date}</h5>
                    <br/>
                    <p class="card-text">{value.description}</p>
                  </div>
                </div>
              
            );
          })}
          </div>
        </div>
      </div>
    </>
  )};
}
