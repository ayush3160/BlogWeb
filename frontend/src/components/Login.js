import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(props){

  let navigate = useNavigate();
    const [login,setLogin] = useState({})

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            login.email = e.target.value.toLowerCase();
        }else if(e.target.name === 'password'){
            login.password = e.target.value
        }
      setLogin(login)
    }

    const handleClick = () => {
        fetch('api/auth/login',{
            method : "POST",
            headers :{
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(login)
        }).then((res) => {return res.json()}).then((data) => {
            if(data.message === "Logged In"){
                localStorage.setItem('token',data.token)
                console.log("Logged In")
                alert("Succesfully Logged In")
                props.handleLogin();
                navigate("/home")
            }else if(data.message === "Password Incorrect"){
                const error = document.getElementById('error')
                error.style.display = "block";
            }else {
                const error = document.getElementById('error')
                error.style.display = "block";
                error.innerHTML = "*User Does Not Exist"
            }
        })
    }

    return(
        <div
        class="card"
        style={{
          width: "50rem",
          margin: "5rem auto 5rem auto",
          backgroundColor: "white",
        }}
      >
        <div class="card-body">
          <h2 class="card-title" style={{ color: "#011627"}}>
              Login
          </h2>
          <br/>
          <img src='/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png' width="100px" style={{marginLeft : "320px"}} alt = "not found"/>
          <br/>
          <div style={{marginLeft : "200px"}}>
          <div style={{marginTop : "30px"}}>
          <label style={{ color: "#011627",fontSize : "20px"}}>Email</label>
          <input name = "email" type={"email"} style={{marginLeft: "100px"}} onChange={(e) => {handleChange(e)}}/>
          <p id="email" style={{display : "none",color : "red"}}>*enter a valid email id</p>
          </div>
          <div style={{marginTop : "20px"}}>
          <label style={{ color: "#011627",fontSize : "20px"}}>Enter Password</label>
          <input name = "password" type={"password"} style={{marginLeft: "15px"}} onChange={(e) => {handleChange(e)}}/>
          <br />
          <p id="error" style={{display : "none",color : "red"}}>*Wrong Password</p>
          </div>
        </div>
        <br/>
        <button className='btn btn-primary' style={{marginLeft : "200px",marginTop : "30px"}} onClick ={handleClick}>Login</button>
        </div>
      </div>

    )
}