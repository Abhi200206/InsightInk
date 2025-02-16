import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import check from "./function";
import Loading from "../components/Loading";
interface Post {
    title?: string,
    post?: string,
    author?: any
}
const Blog = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [params] = useSearchParams();
    const [email, setEmail] = useState<string>("");
    const [post, setPost] = useState<Post>({
        title: "",
        post: "",
        author: ""
    });
    const id = params.get('id');
    useEffect(() => {
        check().then(async (result) => {
            setEmail(result.email);
            if (!result.bool) {
                navigate('/signin');
            }
        })
    }, []);
    useEffect(() => {
        setLoading(true);
        axios.get(`https://backend.vikkymsd777.workers.dev/api/v1/blog/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(async (result) => {
                setPost(result.data.result);
                setLoading(false);
            })
    }, []);
    const deletePost = async () => {
        try {
            let ans = confirm("Are you sure , post will be permanently deleted ?");
            if (ans) {
                setLoading(true);
                let result = await axios.delete(` https://backend.vikkymsd777.workers.dev/api/v1/blog/delete/${id}`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                if (result.data.result) {
                    alert("deleted sucessfully");
                    setLoading(false);
                    navigate(`/home`);
                }
                else {
                    alert("error while deleting post");
                    setLoading(false);
                }

            }
        }
        catch (err) {
            console.log(err);
            alert("error while deleting post navigating to home");
            setLoading(false);
            navigate(`/home`);
        }
    }
    if(loading)
    {
        return (
            <Loading/>
        )
    }
    return (
        <div >
            <div className="flex justify-between px-6 py-2 sticky top-0 z-1 bg-slate-100">
                {(post.author == email) ? <div className="flex gap-4">
                    <div onClick={() => navigate(`/edit?id=${id}`)} className="text-white rounded cursor-pointer text-center bg-red-500 px-4"><p>Edit</p></div>
                    <div onClick={deletePost} className="text-white rounded cursor-pointer text-center bg-red-500 px-4"><p>Delete </p></div>
                </div> : null}
                <div onClick={() => navigate(`/home`)} className="text-white text-center bg-black rounded cursor-pointer px-4"><p>Back</p></div>
            </div>
            <div className="mx-6 my-2 border-[1px] p-2 ">
                 <div>
                    <div className="bg-gradient-to-r from-purple-200 to-green-500 font-serif py-28 text-center overflow-x-auto"><p className="font-bold text-[40px] ml-4 ">{post.title}</p></div>
                    <p className="texgt-slate-500 text-base  whitespace-pre-wrap font-serif mt-4">{post.post}</p>
                    <div className="my-4">
                        <p className="font-bold  text-[25px] font-serif">This Blog is written by: {post.author}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blog;