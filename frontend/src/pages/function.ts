import axios from "axios";
const check = async () => {
    let result = await axios.get(`https://backend.vikkymsd777.workers.dev/api/v1/user/me`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    });
    return result.data;
}
export default check;