import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogPage } from "../components/BlogPage";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";



export const Blog = () => {
    const {id} = useParams();
    const navigate=useNavigate();
    const {loading,blog}=useBlog({id:id || ''});
    if(loading)
    {
        return <div>
              <Loader/>
        </div>  
    }
  return (
    <div>
      <Appbar button="+ New Blog" onClick={()=>{
            navigate('/create')
        }}/>
      <div >
            
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
