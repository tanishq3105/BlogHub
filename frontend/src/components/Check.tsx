import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Loader } from "../components/Loader";
import { Search } from './Search';

export const Check = () => {
    
    const[input, setInput]=useState<string|undefined>(undefined);
    const { loading, blogs } = useBlogs(input);
    const navigate = useNavigate();

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setTimeout(() => {
        
        setInput(e.target.value);
      }, 300);
    }

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            const tokenExpiry = localStorage.getItem('tokenExpiry');

            if (token && tokenExpiry) {
                const currentTime = new Date().getTime();
                if (currentTime > parseInt(tokenExpiry, 10)) {
                    // Token has expired
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiry');
                    navigate('/signin'); // Redirect to /signin
                }
            } else {
                // No token present
                navigate('/signin'); // Redirect to /signin
            }
        };

        checkToken();
    }, [navigate]);

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {/* Container for Appbar and Search */}
            <div className="relative">
                {/* Position the Search component on top of the Appbar */}
                <div className="absolute inset-x-0 top-0 z-10 flex flex-col justify-center h-[70px] left-40 right-40">
                    <Search onChange={handleChange} />
                </div>
                {/* Appbar should appear underneath Search */}
                <div className="relative z-0">
                    <Appbar />
                </div>
            </div>

            {/* Blog cards */}
            <div className="flex justify-center pb-4 bg-customDark">
                <div>
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                            id={blog.id}
                            imageUrl={blog.imageUrl}
                            link="blog"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
