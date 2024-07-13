import axios from "axios";
import { Appbar } from "./Appbar";
import { useState } from "react";
import { CreatePostType } from "@basicdev04/common-app";
import { useNavigate } from "react-router-dom";
import { DB_URL } from "../config";

export const Create = () => {
  const [inputs, setInputs] = useState<CreatePostType>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const HandleClick = async () => {
    try {
      const response = await axios.post(
        `${DB_URL}/api/v1/blog/create`,
        {
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
      console.error("Error while creating blog post:", error);
   
    }
  };
  return (
    <div>
      <Appbar />

      <div className=" mx-32">
        <div className="flex items-center mb-4">
          <div className="border-l-4 border-gray-300 h-12 mr-4"></div>
          <input
            type="text"
            placeholder="Title"
            className="text-5xl border-none outline-none w-full bg-customDark text-customDarkBlue"
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
            className="w-full border-none outline-none resize-none min-h-screen overflow-hidden bg-customDark text-white"
            onChange={(e) => {
              setInputs((c) => ({
                ...c,
                content: e.target.value,
              }));
            }}
          />
        </div>
        <div className="">
  <div className="fixed bottom-0 right-0 m-4 flex space-x-4">
    <button 
      className="px-4 py-2 border border-customBlue hover:bg-customDarkBlue text-white rounded-md" 
      onClick={HandleClick}>
      Publish
    </button>
    
  </div>
</div>

        
      </div>
    </div>
  );
};
