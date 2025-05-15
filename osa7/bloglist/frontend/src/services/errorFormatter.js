export const logAndFormatError = (message, exception) => {
    if (!exception.response) {
        console.log(exception);
        return;
    }
    const errorMessage = exception.response.data.error
        ? `: ${exception.response.data.error}`
        : "";
    const msg = `${message}${errorMessage}`;
    console.log(msg, exception);
    return msg;
};
