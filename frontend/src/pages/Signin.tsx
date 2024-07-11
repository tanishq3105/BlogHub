import { Authin } from "../components/Authin"
import { Quote } from "../components/Quote"

export const Signin=()=>{
    return (
        <div className="grid grid-cols-2">
        <Authin></Authin>
        <div className="invisible md:visible">
        <Quote></Quote>
        </div>

    </div>
    )
}