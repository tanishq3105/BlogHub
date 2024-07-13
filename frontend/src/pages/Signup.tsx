import { Quote } from "../components/Quote"
import { Authup } from "../components/Authup"

export const Signup=()=>{
    return (
        <div className="bg-customDark md:grid grid-cols-2">
  <div className="flex justify-center items-center h-screen md:h-auto">
    <Authup />
  </div>
  <div className="hidden md:block">
    <Quote />
  </div>
</div>

    )
}