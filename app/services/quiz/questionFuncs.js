export const createQuestion = (question, answer1, answer2, answer3, answer4, value) => {
    const URL = `https://murcy.com/quiz/`;
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: question,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            value; value
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

