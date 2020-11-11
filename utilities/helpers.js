
//throws error
exports.throwError = ({ message, status, detail }) => {
    const error = new Error();
    error.message = message;
    error.status = status;
    error.detail = detail;
    throw error;
}

//sanitize name
exports.normalizeName = (inputnames) => {
    const names = inputnames.split(' ');
    const newNames = names.map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    })
    const fullname = newNames.join(' ');
    return fullname; 
}