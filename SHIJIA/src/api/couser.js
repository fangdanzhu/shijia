import axios from "./index"
//获取数据
export function HeadList(payload){
    return axios.get("/course/search",{
        params:payload
    })
}

export function Category(category) {
    return axios.get('/course/info',{
        params:category
    })
}
