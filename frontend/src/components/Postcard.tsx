import { useNavigate } from "react-router-dom";

const Postcard=({title,post,id,email,author}:{title:string,post:string,id:string,email:string,author:string})=>{
    const navigate=useNavigate();
    let arr=post.split(" ");
    let finalpost=arr.splice(0,15);
    arr=[];
    let newpost=finalpost.join(" ");
    const reroute=()=>{
        navigate(`/blog?id=${id}&&email=${email}`);
    }
    return (
        <div onClick={reroute} className="cursor-pointer rounded border-[1px] p-1 my-4">
           <div className="flex justify-between mx-1">
            <div><p className=" font-black text-[20px] my-2 ">{title}</p></div>
            <div className="text-[15px] text-slate-600 font-bold "><p>@{author} </p></div>
           </div>
           <p className="text-slate-500">{newpost}</p>
        </div>
    )
}
export default Postcard