const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: function (token) {
    if (token) {
        const res = jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return {
                    success: false,
                    message: 'Failed to authenticate token.'
                };
            } else {
                return {
                    success: true,
                    decoded: decoded
                }
            }
        });
        return res;
    } else {
        return {
            success: false,
            message: 'No token provided.'
        };
    }
}
   
}