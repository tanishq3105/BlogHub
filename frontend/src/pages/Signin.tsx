import { Authin } from "../components/Authin"
import { Quote } from "../components/Quote"

export const Signin=()=>{
    return (
        <div className="md:grid grid-cols-2">
        <div className="flex justify-center items-center h-screen md:h-auto">
          <Authin />
        </div>
        <div className="hidden md:block">
          <Quote />
        </div>
      </div>
      
    )
}