const express = require('express');
const cors = require('cors');
const {serverConfig, Logger} = require('./config');
const apiRoutes = require('./routes');
const amqplib = require('amqplib');
const {EmailService} = require('./services');

const mailSender = require('./config/email-config');

async function connectQueue() {
    try {
        const connection = await amqplib.connect(serverConfig.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(serverConfig.RABBITMQ_QUEUE);
        channel.consume(serverConfig.RABBITMQ_QUEUE, async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(serverConfig.SENDER_EMAIL, object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        })
    } catch(error) {
        console.log(error);
        Logger.error('Failed to connect to RabbitMQ', 'connectQueue', error);
        throw(error);
    }
}

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Service is healthy',
        timestamp: new Date().toISOString(),
        service: 'Notification Service',
        uptime: process.uptime()
    });
});

app.use('/api',apiRoutes);
app.listen(serverConfig.PORT,async ()=>{
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
    Logger.info('Successfully Started The Server','root',{});
    await connectQueue();
    console.log("Queue is up");
});