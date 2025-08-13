import express from 'express'
import cors from 'cors'
import {Kafka} from 'kafkajs'

const app = express()

app.use(cors({
    origin: "http://localhost:5173",     // Accept requests from 5173 PORT
}))

app.use(express.json());


// Creating Kafka Instance
const kafka = new Kafka({
    clientId:"payment-service",
    brokers:["localhost:9094"]
})

// Creating kafka admin and connect to server
const producer = kafka.producer()

// Function for connecting to kafka
const connectToKafka = async() => {
    try {
        await producer.connect();
        console.log("Connected to Kafka successfully");
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
    }   
}


app.post('/payment-service', async(req,res) => {
    try {
        const {cart, total} = req.body

        // Assume we got the cookie, decrypt it and got userID
        const userID = "123"    // using hardcoded ID

        console.log("Payment request received for user:", userID)
        console.log("Cart items:", cart)
        console.log("Total amount:", total)

        // TODO: Payment

        // KAFKA
        await producer.send({
            topic: 'payment-successful',
            messages: [
                { value: JSON.stringify({ userID, cart, total }) }
            ]
        })

        res.status(200).json({message: "Payment processed successfully", userID, cart, total})
    } catch (error) {
        console.error("Error processing payment:", error)
        res.status(500).send({ error: "Payment processing failed" })
    }
})

app.listen(8000, () => {
    connectToKafka()
    console.log('Payment service is running on port 8000')
})