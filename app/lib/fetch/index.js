export const getErrorWrapper = (message, falback = "Sorry something went wrong please try again later") => {
    return {
        error: {
            message: message || falback
        }
    }
}

export const getResultWrapper = (response) => {
    return {
        result: response
    }
}
