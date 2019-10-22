export const signUpUser = (username, password, email, phone_number) => {
    const URL = `https://murcy.com/users/`;
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
            phone_number: phone_number
        }),
    })
        .then((response) => {
            if(response.statusText === "OK" && response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                throw new Error("Server can't be reached!")
            }
        })
        .then((json) => {
            console.log("json!")
            console.log(json)
        })
        .catch((error) => {
            console.log("error fetching data")
            console.log(error)
            console.log(error.message) // Server can't be reached!
            throw error;
        });
}


export const logInUser = (email, password) => {
    const URL = `https://murcy.com/login`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
        .then((response) => {
            if(response.statusText === "OK" && response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                throw new Error("Server can't be reached!")
            }
        })
        .then((json) => {
            console.log("json!")
            console.log(json)
        })
        .catch((error) => {
            console.log("error fetching data")
            console.log(error)
            throw error;
        });
}
