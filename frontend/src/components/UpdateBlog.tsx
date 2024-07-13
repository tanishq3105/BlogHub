import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";
import axios from "axios";
import { CreatePostType } from "@basicdev04/common-app";
import { useState, useEffect } from "react";

export const UpdateBlogs = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
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
        `${process.env.REACT_APP_DB_URL}/api/v1/blog/update`,
        {
          id,
          title: inputs.title,
          content: inputs.content,
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
      console.error("Error while updating blog post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_DB_URL}/api/v1/blog/delete`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    } catch (error) {
      console.error("Error while deleting blog post:", error);
    }
  };

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
      <div className="mx-4 md:mx-16 lg:mx-32">
        <div className="flex items-center mb-4">
          <div className="border-l-4 border-gray-300 h-12 mr-4"></div>
          <textarea
            placeholder="Title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl border-none outline-none w-full bg-customDark text-customDarkBlue"
            value={inputs.title}
            onChange={(e) => {
              setInputs((c) => ({
                ...c,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div className="text-lg sm:text-xl md:text-2xl font-thin">
          <textarea
            placeholder="Tell your story..."
            className="w-full border-none outline-none resize-none min-h-screen overflow-hidden bg-customDark text-white"
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
            className="px-2 py-1 sm:px-4 sm:py-2 border border-customBlue hover:bg-customDarkBlue text-white rounded-md"
            onClick={handleClick}
          >
            Publish
          </button>
          <button
            className="px-2 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
