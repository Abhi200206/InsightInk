import { useNavigate, useSearchParams } from "react-router-dom";
import check from "./function";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
const Edit=()=>{
    const [params] = useSearchParams();
    const email = params.get("email");
    const id=params.get("id");
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        check().then(async (result) => {
            if (!result.bool) {
                navigate('/signin');
            }
        })
    }, []);
    useEffect(()=>{
        setLoading(true);
        axios.get(`https://backend.vikkymsd777.workers.dev/api/v1/blog/${id}`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then(async(result)=>{
            setTitle(result.data.result.title);
            setPost(result.data.result.post);
            setLoading(false);
        })
    },[]);
    const save=async()=>{
        setLoading(true);
        let result=await axios.put(`https://backend.vikkymsd777.workers.dev/api/v1/blog/put/${id}`,{
            title,
            post
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        });
        if(result.data.result)
            {
                alert("edits saved successfully!");
                setLoading(false);
                navigate(`/home?email=${email}`);
            }
            else{
                alert("error while saving changes, plaese try again!");
                setLoading(false);
            }
    }
    return (
        <div>
            <div>
            {loading ? <Loading /> : <div className="flex justify-center mt-4">
                <div>
                    <div className="flex gap-2 ml-2">
                        <p className="font-bold">Title:</p>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="border-[1px] w-[500px] border-black px-1 rounded" type="text" placeholder="enter the title" />
                        <div onClick={()=>navigate(`/home?email=${email}`)} className="text-white bg-black rounded cursor-pointer px-2"><p>Back</p></div>
                    </div>
                    <div className="my-2 w-full">
                        <textarea placeholder="Start Typing ...." className="border-[1px] text-slate-500 border-black w-[800px] h-[400px]  mx-4 rounded px-1 " value={post} onChange={(e) => setPost(e.target.value)} />
                    </div>
                    <div>
                        <div onClick={save} className="rounded mx-3 text-white bg-green-500 px-6 text-center h-[30px] cursor-pointer"><p>save changes</p></div>
                    </div>
                </div>
            </div>}
        </div>
        </div>
    )
}
export default Edit;