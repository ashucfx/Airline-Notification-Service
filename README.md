### Airline Notification Service using RabbitMQ

This project utilizes RabbitMQ as a message broker to handle asynchronous communication and notifications, which helps in decoupling the main application processes from notification handling, thus enhancing performance and scalability.

#### Overview:
- **RabbitMQ**: A message broker that allows applications to communicate asynchronously through message queues.
- **Purpose**: Used in this project to manage notifications such as emails or push notifications without blocking main application operations.

#### Setup and Configuration:

##### Prerequisites
- Ensure RabbitMQ is installed on your system. You can download it from [RabbitMQ Official Website](https://www.rabbitmq.com/download.html). 
- Install `amqplib` using npm:
```
npm install amqplib
```

##### Environment Configuration

This service requires environment variables to be configured. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

**Required Environment Variables:**

- `PORT` - Server port (default: 4000)
- `DB_HOST` - Database host address
- `DB_PORT` - Database port (default: 3306)
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (notification_db)
- `DB_DIALECT` - Database dialect (mysql)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origins (default: *)
- `RABBITMQ_URL` - RabbitMQ connection URL (default: amqp://localhost:5672)
- `RABBITMQ_QUEUE` - Queue name for notifications (default: noti-queue)
- `GMAIL_EMAIL` - Gmail account for sending emails
- `GMAIL_PASS` - Gmail app password (not regular password)
- `SENDER_EMAIL` - Sender email address for notifications

**Health Check:**

The service provides a health check endpoint at `/health` for monitoring and orchestration purposes.