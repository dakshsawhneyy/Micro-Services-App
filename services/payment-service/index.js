import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "http://localhost:5173",     // Accept requests from 5173 PORT
}))

app.use(express.json());

app.post('/payment-service', (req,res) => {
    try {
        const {cart, total} = req.body

        // Assume we got the cookie, decrypt it and got userID
        const userID = "123"    // using hardcoded ID

        console.log("Payment request received for user:", userID)
        console.log("Cart items:", cart)
        console.log("Total amount:", total)


        // TODO: Payment

        // KAFKA

        res.status(200).json({message: "Payment processed successfully", userID, cart, total})
    } catch (error) {
        console.error("Error processing payment:", error)
        res.status(500).send({ error: "Payment processing failed" })
    }
})

app.listen(8000, () => {
    console.log('Payment service is running on port 8000')
})