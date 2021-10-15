import * as api from "./api"

export const saveCarByUrl = async (url) =>{
    const result = await api.saveCarByUrl(url)
    console.log(url)
    return result
}