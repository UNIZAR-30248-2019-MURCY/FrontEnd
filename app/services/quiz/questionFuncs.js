export const createQuestion = (title, description, options) => {
    const URL = `https://murcy.com/quiz/`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            options: options
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
            console.log(error)
            console.log(error.message)
            throw error;
        });
}

export const editQuestion = (id, title, description, options) => {
    const URL = `https://murcy.com/quiz/`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            title: title,
            description: description,
            options: options
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
            console.log(error)
            console.log(error.message)
            throw error;
        });
}

export const deleteQuestion = (id) => {
    const URL = `https://murcy.com/quiz/`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
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
            console.log(error)
            console.log(error.message)
            throw error;
        });
}

export const listQuestions = () => {
    const URL = `https://murcy.com/quiz/`;
    return fetch(URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
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
            console.log(error)
            console.log(error.message)
            throw error;
        });
}

export const infoQuestions = (id) => {
    const URL = `https://murcy.com/quiz/`;
    return fetch(URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
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
            console.log(error)
            console.log(error.message)
            throw error;
        });
}
