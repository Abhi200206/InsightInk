import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import check from "./function";
import Loading from "../components/Loading";
interface Post {
    title?: string,
    post?: string,
    author?:any
}
const Blog = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [params] = useSearchParams();
    const email=params.get('email');
    const [post, setPost] = useState<Post>({
        title: "",
        post: "",
        author:""
    });
    const id = params.get('id');
    useEffect(()=>{
        check().then(async(result)=>{
            if(!result.bool)
                {
                    navigate('/signin');
                }
        })
    },[]);
    useEffect(() => {
        axios.get(`https://backend.vikkymsd777.workers.dev/api/v1/blog/${id}`,{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(async (result) => {
                setPost(result.data.result);
                setLoading(false);
            })
    }, []);
    return (
        <div >
            <div className="flex justify-between px-6 py-2 sticky top-0 z-1 bg-slate-100">
               {(post.author==email) ?<div onClick={()=>navigate(`/edit?id=${id}&&email=${email}`)} className="text-white rounded cursor-pointer text-center bg-red-500 px-4"><p>Edit</p></div>:null}
                <div onClick={()=>navigate(`/home?email=${email}`)} className="text-white text-center bg-black rounded cursor-pointer px-4"><p>Back</p></div>
            </div>
            <div className="mx-6 my-2 border-[1px] p-2 ">
            {loading ? <Loading /> : <div>
                <p className="font-bold text-[40px] my-4">{post.title}</p>
                <p className="texgt-slate-500">{post.post}</p>
                <div className="my-4">
                    <p className="font-bold text-[20px] ">This Blog is written by: {post.author}</p>
                </div>
            </div>}
            </div>
        </div>
    )
}
export default Blog;