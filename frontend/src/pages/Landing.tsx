import { useEffect } from "react";
import check from "./function";
import { useNavigate } from "react-router-dom";
const Landing=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        check().then(async(result)=>{
            if(result.bool)
                {
                    navigate(`/home?email=${result.email}`)
                }
                else{
                    navigate('/signin');
                }
        })
    },[]);
    return (
        <div>
            Welcome!
        </div>
    )
}
export default Landing;