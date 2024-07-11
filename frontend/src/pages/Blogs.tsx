import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";
export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
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
            {blogs.map(blog=>(
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