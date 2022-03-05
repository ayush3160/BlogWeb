import React from 'react'
import { useState } from 'react'
import validator from 'validator'
import {useNavigate} from 'react-router-dom'

export default function Register(){

  let navigate = useNavigate();

    const [register,setRegister] = useState({})

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            register.name = e.target.value.toLowerCase();
        }else if(e.target.name === 'email'){
            register.email = e.target.value.toLowerCase();
        }else if(e.target.name === 'password'){
            register.password = e.target.value
        }
      setRegister(register)
    }

    const handleClick = () => {
        var email = document.getElementById("email");
        email.style.display = "none";

        var name = document.getElementById("name");
        name.style.display = "none";

        if(!validator.isEmail(register.email)){
            email.style.display = "block";
        } 
        if(register.name.length < 3){
            name.style.display = "block";
        }
        else{
          fetch('api/auth/register',{
            method : "POST",
            headers :{
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(register)
          }).then((res) => {
            return res.json();
          }).then((data) => {
            console.log(data.message)
            if(data.message === "Successfully Registered"){
            alert("Succesfully Registered")
            let path = "/login"
            navigate(path)
            }
            if(data.message === "User already exist"){
              var error = document.getElementById("error")
              error.style.display = "block";
            }
          }).catch((err) => {
            console.log(err)
          })

          
        }
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
                Register
          </h2>
          <p id="error" style={{display : "none",color : "red"}}>*email id already exist</p>
          <br/>
          <div style={{marginLeft : "200px"}}>
          <label style={{ color: "#011627",fontSize : "20px"}}>Name</label>
          <input name = "name" type={"text"} style={{marginLeft: "74px"}} onChange = {(e) => {handleChange(e)}}/>
          <p id="name" style={{display : "none",color : "red"}}>*name should have more than 2 characters</p>
          <div style={{marginTop : "20px"}}>
          <label style={{ color: "#011627",fontSize : "20px"}}>Email</label>
          <input name = "email" type={"email"} style={{marginLeft: "82px"}} onChange = {(e) => {handleChange(e)}}/>
          <p id="email" style={{display : "none",color : "red"}}>*enter a valid email id</p>
          </div>
          <div style={{marginTop : "20px"}}>
          <label style={{ color: "#011627",fontSize : "20px"}}>Set Password</label>
          <input name = "password" type={"password"} style={{marginLeft: "15px"}} onChange = {(e) => {handleChange(e)}}/>
          </div>
        </div>
        <br/>
        <button className='btn btn-primary' style={{marginLeft : "200px",marginTop : "30px"}} onClick={handleClick}>Register</button>
        </div>
      </div>

    )
}