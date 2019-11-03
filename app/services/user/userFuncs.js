export const signUpUser = (username, password, email, fullName) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/user`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            fullName: fullName
        }),
    })
        .then(async (response) => {
            if (response.status === 201) {
                return response
            } else {
                throw new Error("User already exists")
            }
        })
        .catch((error) => {
            console.log(error)
            console.log(error.message)
            throw error;
        });
}


export const logInUser = (username, password) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/user/login`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
        .then(async (response) => {
            if (response.status === 200) {
                const responseJSON = await response.json();
                console.log(responseJSON)
                return responseJSON
            } else {
                throw new Error("LogIn error")
            }
        })
        .catch((error) => {
            console.log(error)
            console.log(error.message)
            throw error;
        });
}

export const requestEdit = (description, token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/request/editor`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: description
        }),
    })
        .then(async (response) => {
            if (response.status === 201) {
                const responseJSON = await response.json();
                console.log(responseJSON)
                return responseJSON
            } else if (response.status === 409) {
                console.log(response.status)
                throw new Error("Currently, there is one request")
            } else {
                console.log(response.status)
                throw new Error("Request Not authorized")
            }
        })
        .catch((error) => {
            console.log(error)
            console.log(error.message)
            throw error;
        });
}

export const getRequestEdit = (token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/request/editor`;
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
            } else if (response.status === 404) {
                console.log(response.status)
                return false
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
