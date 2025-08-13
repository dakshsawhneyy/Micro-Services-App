import {Kafka} from 'kafkajs'

// Creating Kafka Instance
const kafka = new Kafka({
    clientId:"analytic-service",
    brokers:["localhost:9094"]
})

// Creating kafka admin and connect to server
const consumer = kafka.consumer({ groupId: 'analytic-service' })

// Function for connecting to kafka
const run = async() => {
    try {
        await consumer.connect();
        console.log("Connected to Kafka successfully");
        
        await consumer.subscribe({
            topics: ['payment-successful','order-successful', 'email-successful'],      // More than one publishers
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                // using switch for different data recieving
                switch (topic) {
                    case 'payment-successful':
                        {
                            const { userID, cart, total } = JSON.parse(message.value.toString());
                            console.log("Order request received for user:", userID);
                            console.log("Total amount:", total);

                        }
                        break;
                    case 'order-successful':
                        {
                            const { userID, orderID } = JSON.parse(message.value.toString());
                            console.log("Order request received for user:", userID);
                        }
                        break;
                    case 'email-successful':
                        {
                            const { userID, emailID } = JSON.parse(message.value.toString());
                            console.log("Email request received for user:", userID);
                        }
                        break;
                    default:
                        console.log(`Received message from unknown topic: ${topic}`);
                        break;
                }

            }
        })
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
    }
}

run();