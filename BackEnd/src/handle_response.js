
function handleSuccess(res, data, status, sucMsg = 'Success') {
    res.status(status).send({ data, status: sucMsg, statuscode: status });

}

function handleError(res, error, status, errMsg = 'Error') {
    res.status(status).send({ error, status: errMsg, statuscode: status });
 
}

module.exports = {
    handleError,
    handleSuccess
}