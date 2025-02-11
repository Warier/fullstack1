const cache = require('express-redis-cache')({
    prefix: process.env.REDIS_PREFIX,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    auth_pass: process.env.REDIS_PASSWORD,
});

cache.invalidate = (name) => {
    return (req, res, next) => {
        const route_name = name ? name : req.originalUrl;
        if (!cache.connected) {
            console.log("cache não conectado")
            next();
            return;
        }
        cache.del(route_name, (err) => {
            if (err) {
                console.error("Erro ao invalidar cache:", err);
            } else {
                console.log(`Cache invalidado para: ${route_name}`);
            }
        });
        next();
    };
};

module.exports = cache;