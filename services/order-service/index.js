import {Kafka} from 'kafkajs'

// Creating Kafka Instance
const kafka = new Kafka({
    clientId:"order-service",
    brokers:["localhost:9094"]
})

// Creating kafka admin and connect to server
const consumer = kafka.consumer({ groupId: 'order-service' })
const producer = kafka.producer();

// Function for connecting to kafka
const run = async() => {
    try {
        await consumer.connect();
        await producer.connect();
        console.log("Connected to Kafka successfully");
        
        await consumer.subscribe({ 
            topic: 'payment-successful', 
            fromBeginning: true 
        });
    
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { userID, cart, total } = JSON.parse(message.value.toString());
                
                // TODO: Create order on DB
                const dummyID = '123456789'
                console.log("Order created for user:", userID);

                // Now Acts as a producer and sends to email service
                console.log("Order request received for user:", userID);
                await producer.send({
                    topic: 'order-successful',
                    messages: [
                        { value: JSON.stringify({ userID, orderID: dummyID }) }
                    ]
                });
            }
        });
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
    }
}

run()