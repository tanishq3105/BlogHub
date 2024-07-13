import { SignupType } from "@basicdev04/common-app";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DB_URL } from "../config";

console.log(DB_URL);
export const Authup = () => {
  const [postInputs,setPostInputs]=useState<SignupType>({
    name:"",
    email:"",
    password:""
  })

  const navigate=useNavigate();
  const handleSubmit=async()=>{
    try {
        const response=await axios.post(DB_URL+'/api/v1/user/signup',{
            name:postInputs.name,
            email:postInputs.email,
            password:postInputs.password
        })
        const jwt=response.data.jwt;
        localStorage.setItem('token',jwt);
        navigate('/blogs')
    } catch (e) {
        
    }
   

  }
  
    return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="text-white text-4xl font-bold">Create an Account</div>

          <div className="text-l text-slate-400">
            Already have and account?
            <a href="/signin" className="text-customBlue">
              Sign In
            </a>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white mt-3 font-semibold">Username</h1>
            <input
              type="text"
              placeholder="JohnDoe"
              className="border border-slate-400 mt-1 rounded-sm p-1 bg-customGrey text-black placeholder-grey-500 focus:outline-none focus:border-2 focus:border-customBlue placeholder-grey-500"
              onChange={(e)=>{setPostInputs(c=>({
                ...c,
                name:e.target.value
              }))}}
            />
            <h1 className="text-white mt-3 font-semibold">Email</h1>
            <input
              type="text"
              placeholder="johndoe@xyz.com"
              className="border border-slate-400 mt-1 rounded-sm p-1 bg-customGrey text-black placeholder-grey-500 focus:outline-none focus:border-2 focus:border-customBlue"
              onChange={(e)=>{setPostInputs(c=>({
                ...c,
                email:e.target.value
              }))}}
            />
            <h1 className="text-white mt-3 font-semibold">Password</h1>
            <input
              type="password"
             className="border border-slate-400 mt-1 rounded-sm p-1 bg-customGrey text-black placeholder-grey-500 focus:outline-none focus:border-2 focus:border-customBlue"
              onChange={(e)=>{setPostInputs(c=>({
                ...c,
                password:e.target.value
              }))}}
            />
            <div className="flex justify-center mt-5">
              <button className="flex items-center justify-center border-2 border-customBlue h-10 px-32 text-white hover:bg-customDarkBlue font-semibold rounded-md"
              onClick={handleSubmit}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
