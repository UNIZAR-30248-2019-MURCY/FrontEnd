import WEB from "../../config/web";

export const createQuestion = (title, description, options, token) => {
    const URL = WEB.BACK +'/question';
    return fetch(URL, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            options: options
        }),
    })
    .then(async (response) => {
        if (response.status === 201) {
            return response
        } else if (response.status === 403) {
            console.log(response.status)
            throw new Error("Not authorized")
        } else {
            console.log(response.status)
            console.log(response)
            throw new Error("Server error")
        }
    })
    .catch((error) => {
        console.log(error)
        console.log(error.message)
        throw error;
    });
}

export const editQuestion = (id, title, description, options, token) => {
    const URL = WEB.BACK +'/question' + id;
    return fetch(URL, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            options: options
        }),
    })
    .then(async (response) => {
        if (response.status === 201) {
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

export const deleteQuestion = (id, token) => {
    const URL = WEB.BACK +'/question' + id;
    return fetch(URL, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(async (response) => {
        if (response.status === 201) {
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

export const listQuestions = (token) => {
    const URL = WEB.BACK +'/question/list';
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
