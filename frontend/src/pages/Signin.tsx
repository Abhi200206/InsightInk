import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Apppage from "../components/Apppage";
import axios from "axios";
import Loading from "../components/Loading";
import check from "./function";
const Signin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    useEffect(() => {
        check().then(async (result) => {
            if (result.bool) {
                navigate(`/home`);
            }
        })
    }, []);
    const submit = async () => {
        try {
            setLoading(true);
            let result = await axios.post("https://backend.vikkymsd777.workers.dev/api/v1/user/signin", {
                email,
                password
            });
            console.log(result.data);
            if (result.data.bool) {
                setLoading(false);
                alert("Login successfull");
                localStorage.setItem('token', `Bearer ${result.data.token}`);
                navigate(`/home`);
            }
            else {
                setLoading(false);
                alert(result.data.result);
            }
        }
        catch (err) {
            alert("aomething is wrong!!");
        }
    }

    return (
        <div>
            <div className="md:grid md:grid-cols-6 md:h-screen">
                <div className="flex justify-center py-6 mx-4 px-4 md:col-span-3 items-center">
                    <div className="border-[1px] px-2 rounded ">
                        <p className="text-center font-bold text-[25px] mb-2">Signin</p>
                        <p className="my-2 text-slate-900 text-[13px]">Email</p>
                        <input onChange={(e) => {
                            setEmail(e.target.value);
                        }} className="w-full p-1 border-[1px] border-black rounded " type="text" placeholder="enter your email" />
                        <br />
                        <p className="my-2 text-slate-900 text-[13px]">Password</p>
                        <input onChange={(e) => {
                            setPassword(e.target.value);
                        }} className="w-full p-1 border-[1px] border-black rounded " type="password" placeholder="enter password" />
                        <br />
                        <div className="my-4">
                            <div onClick={submit} className="rounded bg-black text-white text-center p-1 cursor-pointer my-2 hover:bg-slate-500">{loading ? <Loading /> : <p>signin</p>}</div>
                            <div className="flex gap-1"><p className="text-slate-700">Don't have an account?</p> <p onClick={() => navigate('/signup')} className="underline cursor-pointer">Signup</p></div>
                        </div>
                    </div>
                </div>
                <div className=" md:col-span-3 flex justify-center items-center bg-purple-400">
                    <Apppage />
                </div>

            </div>
        </div>
    )
}
export default Signin;