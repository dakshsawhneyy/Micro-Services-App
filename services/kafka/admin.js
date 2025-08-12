import {Kafka} from 'kafkajs'

// Creating Kafka Instance
const kafka = new Kafka({
    clientId:"kafka-service",
    brokers:["localhost:9094"]
})

// Creating kafka admin and connect to server
const admin = kafka.admin

// Connect with server and create topics
const connect = async() => {
    await admin.connect();
    await admin.createTopics({
        topics: [
            { topic: 'payment-successful', numPartitions: 1 },
            { topic: 'order-successful', numPartitions: 1 },
            { topic: 'email-successful', numPartitions: 1 }
        ]
    })
}

run()