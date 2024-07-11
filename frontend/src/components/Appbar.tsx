import { useNavigate } from "react-router-dom";
import { useDetails } from "../hooks";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = ({
  button,
  onClick,
}: {
  button: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const navigate = useNavigate();
  const { id } = useDetails();
  const handleClick = () => {
    navigate(`/userblogs/${id}`);
  };
  return (
    <div className="border-b-2 border-grey-300 flex justify-between px-10 py-4 sticky top-0 z-50 bg-white">
      <div className="flex flex-col justify-center font-bold cursor-pointer">
      <Link to={'/blogs'}>Blog Hub</Link></div>
      <div className="flex">
        <div className="flex flex-col justify-center">
          <button
            onClick={handleClick}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            My Blogs
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <button
            onClick={onClick}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {button}
          </button>
        </div>
        <div className="flex flex-col justify-center">
        <button
            onClick={()=>{
              localStorage.clear();
              navigate('/signin');
            }}
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Log Out
          </button>
        

        </div>

        <div className="pl-5">
          <Avatar author="Tanishq" size={9} />
        </div>
      </div>
    </div>
  );
};
