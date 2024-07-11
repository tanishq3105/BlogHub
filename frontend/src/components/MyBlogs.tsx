import { Appbar } from "./Appbar"
import { BlogCard } from "./BlogCard"
import { useMyblogs } from "../hooks"
import { Loader } from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
export const MyBlogs=()=>{
    const {id}=useParams();
    const {loading,myBlog}=useMyblogs({id:id || ''});
    const navigate=useNavigate();
    if(loading){
        return(
            <div>
                <Loader/>
            </div>
        )
    }
    return (
        <div> 
        <Appbar button="+ New Blog" onClick={()=>{navigate('/create')}}/>
        <div className="flex justify-center pb-4 ">
        <div >
            {myBlog.map(blog=>(
                <BlogCard
                key={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                id={blog.id}
            />))}
            
        </div>
        </div>
        </div>
    )
}