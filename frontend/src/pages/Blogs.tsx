import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { Loader } from "../components/Loader";

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    
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
        <div className="flex justify-center pb-4 bg-customDark ">
        <div >
            {blogs.map(blog=>(
                <BlogCard
                key={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                id={blog.id}
                link="blog"
            />))}
            
        </div>
        </div>
        </div>
    )
}