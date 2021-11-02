module.exports = {
    HOST: "192.168.64.3",
    port: '3306',
    USER: "root",
    PASSWORD: "password",
    DB: "reliefe_app",
    logging :false,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};