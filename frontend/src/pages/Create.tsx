import { useNavigate, useSearchParams } from "react-router-dom";
import check from "./function";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
const Create = () => {
    const [params] = useSearchParams();
    const email = params.get("email");
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
    const submit = async () => {
        try {
            setLoading(true);
            let result = await axios.post("https://backend.vikkymsd777.workers.dev/api/v1/blog/add", {
                title,
                post
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            if (result.data.result) {
                alert("blog created successfully");
                setLoading(false);
                setTitle("");
                setPost("");
                navigate(`/home?email=${email}`);
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err);
            alert("error while creating blog");

        }
    }
    return (
        <div>
            {loading ? <Loading /> : <div className="flex justify-center mt-4">
                <div>
                    <div className="flex gap-2 ml-2">
                        <p className="font-bold">Title:</p>
                        <input onChange={(e) => setTitle(e.target.value)} className="border-[1px] w-full md:w-[500px] border-black px-1 rounded" type="text" placeholder="enter the title" />
                        <div onClick={()=>navigate(`/home?email=${email}`)} className="text-white bg-black rounded cursor-pointer px-2"><p>Back</p></div>
                    </div>
                    <div className="my-2 w-full">
                        <textarea placeholder="Start Typing ...." className="border-[1px] text-slate-500 border-black w-full  md:w-[800px] h-[400px]  mx-4 rounded px-1 " value={post} onChange={(e) => setPost(e.target.value)} />
                    </div>
                    <div>
                        <div onClick={submit} className="rounded mx-3 text-white bg-green-500 px-6 text-center w-full h-[30px] cursor-pointer"><p>Create</p></div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default Create;