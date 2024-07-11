import { Quote } from "../components/Quote"
import { Authup } from "../components/Authup"

export const Signup=()=>{
    return (
        <div className="grid grid-cols-2">
            <Authup></Authup>
            <div className="invisible md:visible">
            <Quote></Quote>
            </div>

        </div>
    )
}