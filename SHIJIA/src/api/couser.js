import axios from "./index"
//获取数据
export function HeadList(payload){
    return axios.get("/course/search",{
        params:payload
    })
}

export function Category(category) {
<<<<<<< HEAD
       return axios.get('/course/info',{
           params:category
       })
=======
    return axios.get('/course/info',{
        params:category
    })
>>>>>>> 5f1f6f9dcee748906f7190f797b8b9991f73e9b6
}
