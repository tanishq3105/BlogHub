import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { imgDb } from "./imgConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4 } from 'uuid'

interface ThumbnailProps {
  reset: boolean;
  inputs: {
    title: string;
    content: string;
  };
}

export const Thumbnail = ({ reset, inputs }: ThumbnailProps) => {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | null>('');
  const [loading,setLoading]=useState<boolean>(false);
  

  useEffect(() => {
    if (reset) {
      setFile(undefined); // Reset the file when `reset` prop changes
    }
  }, [reset]);

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setLoading(true);
      

      const img=ref(imgDb,`Imgs/${v4()}`);
      uploadBytes(img,selectedFile).then(data=>{
        
        getDownloadURL(data.ref).then(val=>{
          setFile(URL.createObjectURL(selectedFile));
          setLoading(false);
          setImage(val)
      })
      })

      
    }
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setLoading(true);
      

      const img=ref(imgDb,`Imgs/${v4()}`);
      uploadBytes(img,selectedFile).then(data=>{
        
        getDownloadURL(data.ref).then(val=>{
          setFile(URL.createObjectURL(selectedFile));
          setLoading(false);
          setImage(val)
      })
      })

      
    }

  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DB_URL}/api/v1/blog/create`,
        {
          title: inputs.title,
          content: inputs.content,
          imageUrl: image,
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
  // Handle the submit action here
  
  return (
    <div className={`flex flex-col justify-center h-screen px-4 md:px-0`}>
    <div className="flex justify-center">
      <div
        style={{ height: "650px", width: "910px" }}
        className="bg-customDarkD border border-customBlue z-50 p-6 rounded-lg shadow-lg"
      >
        <div className="text-center text-2xl font-bold text-customBlue">
          Upload Thumbnail
        </div>
        <p className="text-center pt-10 text-customGrey">
          Upload a Thumbnail for your blog
        </p>
        <div
          className={`flex flex-col justify-center pt-6 h-96 border-2 border-customDarkBlue${
            !file ? " border-dashed" : ""
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex justify-center">
            <div
              style={{ height: "170px", width: "300px" }}
              className={`${!file ? "border-2" : ""}`}
            >
              <div className="flex items-center justify-center h-[170px] w-[300px] bg-customGrey">
                {file ? (
                  <img
                    src={file}
                    alt="Thumbnail Preview"
                    style={{
                      height: "170px",
                      width: "300px",
                      backgroundSize: "100%",
                    }}
                  />
                ) : ( loading?<div className="w-full bg-gray-200 h-1 relative overflow-hidden">
                  <div className="bg-blue-500 h-1 absolute animate-loading-bar"></div>
                </div>
                :
                  <span className="text-center text-lg">Image Preview</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center text-customGrey">
            <div className="pt-2">Drop the file here or</div>
            <label className="cursor-pointer hover:text-customBlue text-customDarkBlue font-bold py-2 px-2">
              Browse
              <input type="file" className="hidden" onChange={handleChange} />
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-end pt-5">
          <div className="flex justify-center">
            <button
              className="w-24 rounded-l border border-customBlue hover:bg-customDarkBlue text-white px-3 py-2"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
};
