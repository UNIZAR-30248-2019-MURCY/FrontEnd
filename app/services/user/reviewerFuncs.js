export const reviewerReqList = (token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/request/editor/list`;
    return fetch(URL, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                const responseJSON = await response.json();
                console.log(responseJSON)
                return responseJSON
            } else if (response.status === 403) {
                console.log(response.status)
                throw new Error("Not authorized")
            } else {
                console.log(response.status)
                throw new Error("Server error")
            }
        })
        .catch((error) => {
            console.log(error)
            console.log(error.message)
            throw error;
        });
}
