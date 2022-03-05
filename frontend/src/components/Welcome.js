import React from "react";

export default function Welcome(){
    return(
      <>
      <div style={{textAlign : "center"}}>
          <h1 style={{marginTop : "30px",textDecoration : "underline"}}>
            Welcome To BLOG<span style={{ color: "red" }}>WEB</span>
          </h1>
          <br/>
          <h2
            class="card-text"
            style={{textAlign : "left",marginLeft : "10px",lineHeight: "3rem" }}
          >
            How to Get Started ?
          </h2>
          <p style={{textAlign : "left",marginLeft : "10px",lineHeight: "3rem" }}>
            If you are not registered on BLOGWEB. You can setup your account on clicking register button on navbar.
          </p>
          <p style={{textAlign : "left",marginLeft : "10px",lineHeight: "3rem" }}>
            If you are already registered on BLOGWEB. You can login using your email id and password.
          </p>
          </div>
        </>

    )
}