import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import check from "./function";
import Loading from "../components/Loading";
interface Post {
    title?: string,
    post?: string
}
const Blog = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [params] = useSearchParams();
    const email=params.get('email');
    const [post, setPost] = useState<Post>({
        title: "",
        post: ""
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
            <div className="flex justify-between px-6 py-2">
                <div onClick={()=>navigate(`/edit?id=${id}&&email=${email}`)} className="text-white rounded cursor-pointer text-center bg-red-500 px-4"><p>Edit</p></div>
                <div onClick={()=>navigate(`/home?email=${email}`)} className="text-white text-center bg-black rounded cursor-pointer px-4"><p>Back</p></div>
            </div>
            <div className="mx-6 my-2 border-[1px] p-2 ">
            {loading ? <Loading /> : <div>
                <p className="font-bold text-[40px] my-4">{post.title}</p>
                <p className="texgt-slate-500">{post.post}</p>
            </div>}
            </div>
        </div>
    )
}
export default Blog;