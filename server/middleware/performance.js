const logger = require('../utils/logger');

const performanceMiddleware = (req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const duration = seconds * 1000 + nanoseconds / 1000000;

        logger.info('Request processed', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration.toFixed(2)}ms`
        });
    });

    next();
};

module.exports = performanceMiddleware; 