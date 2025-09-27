const sendSuccess = (res, data) => {
    res.status(200).json({
        success: true,
        data: data
    });
}

const sendError = (res, message, details) => {
    res.status(500).json({
        success: false,
        error: message,
        details: details
    });
}

module.exports = {
    sendSuccess,
    sendError
};
