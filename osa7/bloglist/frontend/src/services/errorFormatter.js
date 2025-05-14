export const logAndFormatError = (message, exception) => {
    const errorMessage = exception.response.data.error
        ? `: ${exception.response.data.error}`
        : "";
    const msg = `${message}${errorMessage}`;
    console.log(msg, exception);
    return msg;
};
