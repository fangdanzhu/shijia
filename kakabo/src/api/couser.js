import axios from "./index"
//获取数据
export function HeadList(payload){
    console.log(payload);
    return axios.get("/course/info",{
        params:{search:"A"}
    })
}
