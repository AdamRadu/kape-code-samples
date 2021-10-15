const axios = require("axios")
const port= 3001

export const getUserByUsername = async (username) =>
{
    const response = await axios.get(`http://localhost:${port}/users${username}`)
    return response.data
}