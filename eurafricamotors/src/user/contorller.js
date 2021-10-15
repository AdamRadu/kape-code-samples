import * as api from "./api"

export const getUserByUsername = async (username) =>{
    const result = await api.getUserByUsername(username)
    return result
}