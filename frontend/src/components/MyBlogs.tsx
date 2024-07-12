import { Appbar } from "./Appbar"
import { BlogCard } from "./BlogCard"
import { useMyblogs } from "../hooks"
import { Loader } from "./Loader";
import { useNavigate, useParams, Link } from "react-router-dom";
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
        <Appbar/>
        <div className="flex justify-center pb-4 ">
        <div >
            <Link to='/create'>
            {myBlog.map(blog=>(
                <BlogCard
                key={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                id={blog.id}
                link="update"
            />))}
            </Link>
            
        </div>
        </div>
        </div>
    )
}