const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 4000,
    
    // Database Configuration
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    
    // RabbitMQ Configuration
    RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    RABBITMQ_QUEUE: process.env.RABBITMQ_QUEUE || 'noti-queue',
    
    // Email Configuration
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    SENDER_EMAIL: process.env.SENDER_EMAIL || 'airlinenoti@gmail.com',
    
    // Environment
    NODE_ENV: process.env.NODE_ENV || 'development'
}