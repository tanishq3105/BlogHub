import { SignupType } from "@basicdev04/common-app";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DB_URL } from "../config";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader component

console.log(DB_URL);

export const Authin = () => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true); 
    try {
      const response = await axios.post(DB_URL + '/api/v1/user/signin', {
        name: postInputs.name,
        email: postInputs.email,
        password: postInputs.password
      });
      const jwt = response.data.jwt;
      localStorage.setItem('token', jwt);
      if (response.status === 200) {
        navigate('/blogs');
      }
    } catch (e) {
      console.error(e); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader size={50} color={"#4A90E2"} loading={loading} /> {/* Display spinner */}
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            <div className="text-4xl font-bold">Sign In To Your Account</div>

            <div className="text-l text-slate-400">
              Don't have an account?
              <a href="/signup" className="text-indigo-600">
                Sign Up
              </a>
            </div>
            <div className="flex flex-col">
              <h1 className="mt-3 font-semibold">Email</h1>
              <input
                type="text"
                placeholder="johndoe@xyz.com"
                className="border border-slate-400 mt-1 rounded-sm p-1"
                onChange={(e) => setPostInputs(c => ({
                  ...c,
                  email: e.target.value
                }))}
              />
              <h1 className="mt-3 font-semibold">Password</h1>
              <input
                type="password"
                className="border border-slate-400 mt-1 rounded-sm p-1"
                onChange={(e) => setPostInputs(c => ({
                  ...c,
                  password: e.target.value
                }))}
              />
              <div className="flex justify-center mt-5">
                <button
                  className="flex items-center justify-center border border-black h-10 px-32 bg-indigo-600 text-white border-none hover:bg-indigo-700 font-semibold rounded-md"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
