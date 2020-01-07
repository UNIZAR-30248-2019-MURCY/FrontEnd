import WEB from "../../config/web";

export const createQuiz = (title, description, questionIds, publish, token) => {
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
            questionIds: questionIds,
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
            questionIds: questionsIds,
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

export const deleteQuiz = (id, token) => {
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
        if (response.status === 202) {
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
