export const createQuestion = (title, description, options, token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/question`;
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
        if (response.status === 200) {
            const responseJSON = await response.json();
            console.log(responseJSON)
            return responseJSON
        } else {
            throw new Error("Create question error")
        }
    })
    .catch((error) => {
        console.log(error)
        console.log(error.message)
        throw error;
    });
}

export const editQuestion = (id, title, description, options, token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/question/` + id;
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
        if (response.status === 200) {
            const responseJSON = await response.json();
            console.log(responseJSON)
            return responseJSON
        } else {
            throw new Error("Edit question error")
        }
    })
    .catch((error) => {
        console.log(error)
        console.log(error.message)
        throw error;
    });
}

export const deleteQuestion = (id, token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/question/` + id;
    return fetch(URL, {
        method: 'DELETE',
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
        } else {
            throw new Error("Delete question error")
        }
    })
    .catch((error) => {
        console.log(error)
        console.log(error.message)
        throw error;
    });
}

export const listQuestions = (id, token) => {
    const URL = `https://preunizar-30248-2019-murcy.herokuapp.com/api/question/` + id;
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
        } else {
            throw new Error("List questions error")
        }
    })
    .catch((error) => {
        console.log(error)
        console.log(error.message)
        throw error;
    });
}
