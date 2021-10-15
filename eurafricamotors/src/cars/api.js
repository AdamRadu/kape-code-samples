const axios = require("axios")
const port= 3001

export const saveCarByUrl = async (url) =>
{
    const response = await axios.post(`http://localhost:${port}/add`,{
        url: url
    })
    // .then(function (response) {
    //     console.log(response);
    //   })
    return response.data
}