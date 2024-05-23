import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Postcard from "../components/Postcard";
import check from "./function";
const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    let [posts, setPosts] = useState([]);
    const [params] = useSearchParams();
    const email: any = params.get("email");
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    }
    useEffect(() => {
        check().then(async (result) => {
            if (!result.bool) {
                navigate('/signin');
            }
        })
    }, []);
    useEffect(() => {
        try {
            axios.get("https://backend.vikkymsd777.workers.dev/api/v1/blog/all/bulk", {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
                .then(async (result) => {
                    setPosts(result.data.result);
                    setLoading(false);

                });
        }
        catch (err) {
            alert("error while fetching ");
            console.log(err);
        }
    }, []);
    const route = () => {
        navigate(`/create?email=${email}`);
    }
    return (
        <div>
            {loading ? <Loading /> : <div>
                <div className=" flex justify-between items-center py-2 px-6 bg-slate-200 sticky top-0 ">
                    <div onClick={logout} className="bg-black rounded text-white hover:bg-slate-900 cursor-pointer py-1 text-center px-2"><p>Logout</p></div>
                    <div className="rounded bg-slate-500 px-2" ><p>{email}</p></div>
                </div>
                <div>
                    <div className="flex justify-between mx-[10px] items-center ">
                        <div><p className="text-[30px] font-bold my-12">your posts:</p></div>
                        <div onClick={route} className="rounded text-white bg-green-500 px-6 text-center h-[30px] cursor-pointer"><p>Create</p></div>
                    </div>
                    <div className="mx-4 p-1">
                        {posts.length>0?posts.map((m: { title: string, post: string, id: string }) => {
                            return <Postcard key={m.id} title={m.title} post={m.post} id={m.id} email={email} />
                        }):<div className="text-slate-200 text-[40px] flex justify-center">
                            <p>Nothing to show. Create one</p>
                            </div>}</div>
                </div>
            </div>}
        </div>
    )
}
export default Home;