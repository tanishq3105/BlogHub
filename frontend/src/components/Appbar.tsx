import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../hooks";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  const { id } = useDetails();
  const [dropdownOpen, setDropdownOpen] = useState(false);



  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin')
  };

  return (
    <div className="items-center pt-4 px-4 sm:px-8 md:flex md:justify-between md:items-center border-b-2 sticky top-0 bg-white z-50">
      <div className="flex flex-col justify-center font-bold cursor-pointer text-xl pb-3">
        <Link to={"/blogs"}>Blog Hub</Link>
      </div>
      <div className="flex ">
        <div className="flex flex-col justify-center pb-3 hover:text-indigo-600 relative">
          <div>
            <a href="/create" className="flex">
              <div className="flex flex-col justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
              <div>Write</div>
            </a>
          </div>
        </div>

        <div className="pl-5 flex-flex-col pb-3 relative">
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <Avatar author="Tanishq" size={9} />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
              <Link
                to={`/userblogs/${id}`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Manage Blogs
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
