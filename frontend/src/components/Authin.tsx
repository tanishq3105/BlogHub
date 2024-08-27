import { SignupType } from "@basicdev04/common-app";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader component
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Authin = () => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!postInputs.email || !postInputs.password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(process.env.REACT_APP_DB_URL + '/api/v1/user/signin', {
        name: postInputs.name,
        email: postInputs.email,
        password: postInputs.password
      });
      if (response.status === 200) {
        const jwt = response.data.jwt;
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        const newExpiryTime = new Date().getTime() + oneWeekInMilliseconds;
        localStorage.setItem('token', jwt);
        localStorage.setItem('tokenExpiry', newExpiryTime.toString());
        console.log(jwt);
        if(localStorage.getItem('token'))
        {

          navigate('/blogs');
        }
      }
      
      
      
      
    } catch (e) {
      toast.error('Failed to Sign In');
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
            <div className="text-white text-4xl font-bold">Sign In To Your Account</div>

            <div className="text-l text-slate-400">
              Don't have an account?
              <a href="/signup" className="text-customBlue">
                Sign Up
              </a>
            </div>
            <div className="flex flex-col">
              <h1 className="mt-3 font-semibold text-white">Email</h1>
              <input
                type="text"
                placeholder="johndoe@xyz.com"
                className="border border-slate-400 mt-1 rounded-sm p-1 bg-customGrey text-black placeholder-grey-500 focus:outline-none focus:border-2 focus:border-customBlue"
                onChange={(e) => setPostInputs(c => ({
                  ...c,
                  email: e.target.value
                }))}
              />
              <h1 className="mt-3 font-semibold text-white">Password</h1>
              <input
                type="password"
                className="border border-slate-400 mt-1 rounded-sm p-1 bg-customGrey focus:outline-none focus:border-2 focus:border-customBlue"
                onChange={(e) => setPostInputs(c => ({
                  ...c,
                  password: e.target.value
                }))}
              />
              <div className="flex justify-center mt-5">
                <button
                  className="flex items-center justify-center border-2 border-customBlue h-10 px-32 text-white hover:bg-customDarkBlue font-semibold rounded-md"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
