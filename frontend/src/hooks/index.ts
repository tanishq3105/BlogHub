import axios from "axios";
import { useEffect, useState } from "react"
import { DB_URL } from "../config";

interface Blog{
    content:string,
    title:string,
    id:number,
    publishedDate:string,
    author:{
        name:string
    }
}
const token=localStorage.getItem('token');
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{

        axios.get(`${DB_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            console.log(response.data)
            setBlogs(response.data);
            setLoading(false);
        })
    },[])

    return{
        loading,blogs
    }
}

export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true)
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{

        axios.get(`${DB_URL}/api/v1/blog/post/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            
            setBlog(response.data);
            setLoading(false);
        })
    },[])

    return{
        loading,blog
    }
}


export const useMyblogs=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true)
    const [myBlog,setMyBlog]=useState<Blog []>([]);

    useEffect(()=>{

        axios.get(`${DB_URL}/api/v1/blog/myblogs/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            
            setMyBlog(response.data);
            setLoading(false);
        })
    },[])

    return{
        loading,myBlog
    }
}

export const useDetails=()=>{
    const token=localStorage.getItem('token');
    const [id,setId]=useState('');
    useEffect(()=>{

        axios.get(`${DB_URL}/api/v1/user/user-details`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            
            setId(response.data);
        })
    },[])

    return{
        id
    } 
        

}