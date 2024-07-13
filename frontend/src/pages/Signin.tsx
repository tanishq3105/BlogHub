import { useNavigate } from "react-router-dom";
import { Authin } from "../components/Authin"
import { Quote } from "../components/Quote"
import { useEffect } from "react";

export const Signin=()=>{
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
  useEffect(()=>{
    if(token)
        {
            navigate('/blogs');
        }
},[])
    return (

        <div className="bg-customDark md:grid grid-cols-2">
        <div className="flex justify-center items-center h-screen md:h-auto">
          <Authin />
        </div>
        <div className="hidden md:block">
          <Quote />
        </div>
      </div>
      
    )
}