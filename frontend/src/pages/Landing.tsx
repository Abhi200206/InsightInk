import { useEffect } from "react";
import { useState } from "react";
import check from "./function";
import axios from "axios";
import Icon from "./Icon";
import Postcard from "../components/Postcard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
const Landing = () => {
    const [posts, setPosts] = useState([]);
    const [params] = useSearchParams();
    const bool = params.get("bool");
    const nemail = params.get("email");
    const [loading, setLading] = useState<boolean>(true);
    const email = "tset@gmail.com";
    const navigate = useNavigate();
    useEffect(() => {
        check().then(async (result) => {
            if (result.bool) {
                navigate(`/home?email=${result.email}`);
                setLading(false);
            }
        })
    }, []);
    useEffect(() => {
        try {
            axios.get("https://backend.vikkymsd777.workers.dev/api/v1/user/all/bulk")
                .then(async (result) => {
                    setPosts(result.data.result);
                    setLading(false);
                })
        }
        catch (err) {
            console.log(err);
        }
    }, [])
    return (
        <div>
            <div className="sticky top-0 bg-gradient-to-r from-purple-200 to-green-500 py-2 px-4 flex justify-between ">
                <div className="font-bold  text-[20px] from-purple-200 to-green-500 "><p>InsightInk</p></div>
                {bool ? <div onClick={()=>navigate(`/home?email=${nemail}`)} className="rounded cursor-pointer bg-black text-white px-4"><p>Back</p></div> : <div className="flex gap-4">
                    <div onClick={() => navigate(`/signup`)} className="rounded bg-white text-black border-[1px] cursor-pointer px-2"><p>Signup</p></div>
                    <div onClick={() => navigate(`/signin`)} className="rounded bg-white text-black border-[1px] cursor-pointer px-2"><p>Login</p></div>
                </div>}
            </div>
            <div className="flex justify-between px-4 items-center">
                <Icon />
            </div>
            {loading ? <Loading /> : <div className="mx-4 p-1">
                {posts.length > 0 ? posts.map((m: { title: string, post: string, id: string }) => {
                    return <Postcard key={m.id} title={m.title} post={m.post} id={m.id} email={email} />
                }) : <div className="text-slate-200 text-[40px] flex justify-center">
                    <p>Nothing to show. Create one</p>
                </div>}</div>}
        </div>
    )
}
export default Landing;