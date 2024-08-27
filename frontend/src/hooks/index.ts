import axios from "axios";
import { useEffect, useState } from "react"



interface Blog{
    imageUrl: string;
    content:string,
    title:string,
    id:number,
    publishedDate:string,
    author:{
        name:string
    }
}


export const useBlogs=(input:string|undefined)=>{
    const token=localStorage.getItem('token');
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
       
        axios.get(`${process.env.REACT_APP_DB_URL}/api/v1/blog/bulk?filter=${input?input:' '}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            setBlogs(response.data.posts);
            setLoading(false);
        })
    },[input])

    return{
        loading,blogs
    }
}

export const useBlog=({id}:{id:string})=>{
    const token=localStorage.getItem('token');
    const [loading,setLoading]=useState(true)
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_DB_URL}/api/v1/blog/post/${id}`,{
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
    const token=localStorage.getItem('token');
    const [loading,setLoading]=useState(true)
    const [myBlog,setMyBlog]=useState<Blog []>([]);

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_DB_URL}/api/v1/blog/myblogs/${id}`,{
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
    const [name,setName]=useState('');
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_DB_URL}/api/v1/user/user-details`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            console.log(response.data);
            setId(response.data.name[0].id);
            setName(response.data.name[0].name);
        })
    },[])

    return{
        id,name
    } 
        

}