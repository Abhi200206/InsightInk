import { useNavigate } from "react-router-dom";

const Postcard=({title,post,id,author}:{title:string,post:string,id:string,author:string})=>{
    const navigate=useNavigate();
    let newpost=post.slice(0,500)+" ...";
    let readTime=Math.ceil(post.length/1500);
    const reroute=()=>{
        navigate(`/blog?id=${id}`);
    }
    return (
        <div onClick={reroute} className="cursor-pointer rounded border-[1px] p-1 my-4">
           <div className="flex justify-between mx-1 text-ellipsis overflow-hidden ...">
            <div><p className=" font-black text-[20px] my-2 ">{title}</p></div>
            <div className="text-[15px] text-slate-600 font-bold "><p>@{author} </p></div>
           </div>
           <p className="text-slate-500">{newpost}</p>
           <div className="flex gap-1 ml-2">
           <div className="flex flex-col justify-center"> <Circle/></div>
           <p className=" text-[12px] text-slate-600 my-4 ">{readTime} min read</p>
           </div>
        </div>
    )
}
const Circle=()=>{
    return <div className="rounded-full h-1 w-1 bg-slate-500">

    </div>
}
export default Postcard