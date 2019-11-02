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
            if(response.status === 201) {
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
            if(response.status === 200) {
                const responseJSON = await response.json();
                console.log(responseJSON)
                return responseJSON
            } else{
                throw new Error("LogIn error")
            }
        })
        .catch((error) => {
            console.log("error fetching data")
            console.log(error)
            throw error;
        });
}
