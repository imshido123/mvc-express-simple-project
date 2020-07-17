const config = require('../../config')

const logErrors = (err, req, res, next) => {
    console.log(err.stack);
    next(err);
};

const clientErrorHandler = (err, req, res, next) => {
    // AJAX errors
    if (req.xhr) {
        res.status(500).json({ err: err.message });
    }
    else {
        next(err);
    }
};

const errorHandler = (err, req, res, next) => {
    // Streaming errors
    if (res.headersSent) {
        next(err);
    }
    if(!config.dev) {
        delete err.stack;
    }

    res.status(err.status || 500);
    res.render("error", { error: err });
};

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
};