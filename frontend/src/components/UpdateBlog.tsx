import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";
import { DB_URL } from "../config";
import axios from "axios";
import { CreatePostType } from "@basicdev04/common-app";
import { useState, useEffect } from "react";

export const UpdateBlogs = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || '' });
  const [inputs, setInputs] = useState<CreatePostType>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setInputs({
        title: blog.title,
        content: blog.content,
      });
    }
  }, [blog]);

  const handleClick = async () => {
    try {
      const response = await axios.put(
        `${DB_URL}/api/v1/blog/update`,
        {
          id,
          title:inputs.title,
          content:inputs.content
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/blogs");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error while creating blog post:", error);
    }
  };
  const handleDelete=async()=>{
        try{
          const response = await axios({
            method: 'delete',
            url: `${DB_URL}/api/v1/blog/delete`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: {
              id: id,
            },
          });
      
              if (response.status === 200) {
                navigate(-1);
              } else {
                console.error("Unexpected status code:", response.status);
              }
        }catch (error) {
            console.error("Error while creating blog post:", error);
  }
}

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="mx-32">
        <div className="flex items-center mb-4">
          <div className="border-l-4 border-gray-300 h-12 mr-4"></div>
          <input
            type="text"
            placeholder="Title"
            className="text-5xl border-none outline-none w-full text-customDarkBlue bg-customDark"
            value={inputs.title}
            onChange={(e) => {
              setInputs((c) => ({
                ...c,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div className="text-2xl font-thin">
          <textarea
            placeholder="Tell your story..."
            className="w-full border-none outline-none resize-none min-h-screen overflow-hidden text-white bg-customDark"
            value={inputs.content}
            onChange={(e) => {
              setInputs((c) => ({
                ...c,
                content: e.target.value,
              }));
            }}
          />
        </div>
        <div className="fixed bottom-0 right-0 m-4 flex space-x-4">
    <button 
      className="px-4 py-2 border border-customBlue hover:bg-customDarkBlue text-white rounded-md" 
      onClick={handleClick}
      >
      Publish
    </button>
    <button 
      className="px-4 py-2 bg-red-600 text-white rounded-md" 
      onClick={handleDelete}
      >
      Delete
    </button>
  </div>
        
        
      </div>
    </div>
  );
};
