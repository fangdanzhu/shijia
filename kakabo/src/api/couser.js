import axios from "./index"
//获取数据
export function HeadList(payload){
    return axios.get("/course/info",{
        param:{
            payloadid
        }
    })
}
