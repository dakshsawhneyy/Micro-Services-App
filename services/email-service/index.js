import {Kafka} from 'kafkajs'

// Creating Kafka Instance
const kafka = new Kafka({
    clientId:"email-service",
    brokers:["localhost:9094"]
})

// Creating kafka admin and connect to server
const consumer = kafka.consumer({ groupId: 'email-service' })
const producer = kafka.producer();

// Function for connecting to kafka
const run = async() => {
    try {
        await consumer.connect();
        await producer.connect();
        console.log("Connected to Kafka successfully");
        
        await consumer.subscribe({ 
            topic: 'order-successful', 
            fromBeginning: true 
        });
    
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { userID, orderID } = JSON.parse(message.value.toString());
                
                // TODO: Send EMAIL to user
                const dummyEmailID = '1234456789'
                console.log("Email request received for user:", userID);

                // Now Acts as a producer and sends to email service
                console.log("Order request received for user:", userID);
                await producer.send({
                    topic: 'email-successful',
                    messages: [
                        { value: JSON.stringify({ userID, emailID: dummyEmailID }) }
                    ]
                });
            }
        });
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
    }
}

run()