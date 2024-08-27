import { Appbar } from "./Appbar"
import { BlogCard } from "./BlogCard"
import { useMyblogs } from "../hooks"
import { Loader } from "./Loader";
import { useParams } from "react-router-dom";
export const MyBlogs=()=>{
    const {id}=useParams();
    const {loading,myBlog}=useMyblogs({id:id || ''});
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
        <div className=" pb-4 bg-customDark ">
        <div >
           
            {myBlog.map(blog=>(
                <BlogCard
                key={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                id={blog.id}
                imageUrl={blog.imageUrl}
                link="update"
            />))}
           
            
        </div>
        </div>
        </div>
    )
}