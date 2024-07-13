import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogPage } from "../components/BlogPage";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";



export const Blog = () => {
    const {id} = useParams();
    const {loading,blog}=useBlog({id:id || ''});
    if(loading)
    {
        return <div>
              <Loader/>
        </div>  
    }
  return (
    <div>
      <Appbar/>
      <div className="min-h-screen w-full bg-customDark">
    <BlogPage
        authorName={blog?.author.name || ''}
        title={blog?.title || ''}
        content={blog?.content || ''}
        publishedDate={blog?.publishedDate || ''}
    />
</div>

    </div>
  );
};
