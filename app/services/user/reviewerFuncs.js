export const reviewerReqList = (token, closed, approved) => {
    const URL = 'https://preunizar-30248-2019-murcy.herokuapp.com/api/request/editor/list?closed='+closed+'&approved='+approved;
    return fetch(URL, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
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

export const acceptRe = (token, response, id) => {
    const URL = 'https://preunizar-30248-2019-murcy.herokuapp.com/api/workflow/' + id + '/approve';
    return fetch(URL, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            response: response
        }),
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

export const denyReq = (token, response, id) => {
    const URL = 'https://preunizar-30248-2019-murcy.herokuapp.com/api/workflow/' + id + '/deny';
    return fetch(URL, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            response: response
        }),
    })
        .then(async (response) => {
            if (response.status === 201) {
                return response
            } else if (response.status === 403) {
                console.log(response.status)
                throw new Error("Not authorized")
            } else if (response.status === 404) {
                console.log(response.status)
                throw new Error("Not found")
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
