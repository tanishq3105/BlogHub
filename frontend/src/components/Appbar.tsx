import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../hooks";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

const AppbarComponent: React.FC = () => {
  const navigate = useNavigate();
  const { id, name } = useDetails();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 sm:px-8 sticky top-0 bg-customDarkD z-50">
      <div className="flex gap-10">
        <div className="font-bold cursor-pointer text-2xl text-customBlue">
          <Link to="/blogs">Blog Hub</Link>
        </div>
      </div>
      <div className="hidden md:flex space-x-4 items-center">
        <Link
          to="/create"
          className="flex items-center hover:text-customDarkBlue"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-customBlue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <span className="ml-2 text-customBlue">Write</span>
        </Link>
        <div className="relative">
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <Avatar author={name} size={36} />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-customDark border border-gray-200 shadow-lg rounded-lg">
              <Link
                to={`/userblogs/${id}`}
                className="block px-4 py-2 text-customGrey hover:text-customDarkBlue"
                onClick={() => setDropdownOpen(false)}
              >
                Manage Blogs
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-customGrey hover:text-customDarkBlue"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden flex items-center text-customGrey">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {mobileMenuOpen && (
          <div className="absolute right-0 top-16 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
            <Link
              to="/create"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Write
            </Link>
            <Link
              to={`/userblogs/${id}`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Manage Blogs
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Memoize the Appbar component
const Appbar = React.memo(AppbarComponent);

export { Appbar };
