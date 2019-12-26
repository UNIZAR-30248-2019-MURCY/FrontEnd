import WEB from "../../config/web";

export const createQuiz = (title, description, questionsIds, publish, token) => {
    const URL = WEB.BACK +'/quiz';
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
            questionsIds: questionsIds,
            publish: publish
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



export const editQuiz = (id, title, description, questionsIds, publish, token) => {
    const URL = WEB.BACK +'/quiz/' + id;
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
            options: questionsIds,
            publish: publish
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
    console.log(id)
    console.log(token)
    const URL = WEB.BACK +'/quiz/' + id;
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
            return response
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

export const listQuiz = (token) => {
    const URL = WEB.BACK +'/quiz/list';
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
