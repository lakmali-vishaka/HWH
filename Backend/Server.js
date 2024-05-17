require("dotenv").config(); //STR
const express = require("express"); //STR
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); //STR
const Stripe = require('stripe'); //STR
const stripe = Stripe(process.env.SECRET_KEY); //STR
//const dotenv = require("dotenv");
const app = express(); //STR

app.use(express.json()); //STR


//defining the port
const PORT = process.env.PORT || 8070;

//stripe port
const STRIPE_PORT = process.env.PORT ||8080; //STR

app.post('/pay', async(req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: 1099,
          currency: "USD",
          //payment_method: paymentMethodId,////////////////
          payment_method_types: ["card"],
          //setup_future_usage: 'off_session',////////////////
      });
      const clientSecret = paymentIntent.client_secret;
      res.json({ message: "Payment Initiated", clientSecret });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


app.listen(STRIPE_PORT, () => console.log(`Stripe running on port ${STRIPE_PORT}`)); //STR





//use the dependencies that we are use
app.use(cors()); //STR
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

//connect to mongodb
mongoose.connect(URL,{
    useNewUrlParser: true,
});

//open connection that we are created

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection success!");
})



// Operator database connection
const operatorDB_URL = process.env.OPERATOR_MONGODB_URL;
const operatorDB = mongoose.createConnection(operatorDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
operatorDB.on('connected', () => {
    console.log("Connected to operator database successfully!");
});
operatorDB.on('error', (err) => {
    console.error("Error connecting to operator database:", err);
});

// Vehicle database connection
const vehicleDB_URL = process.env.VEHICLE_MONGODB_URL; // Assuming you have a separate URL for the vehicle database
const vehicleDB = mongoose.createConnection(vehicleDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
vehicleDB.on('connected', () => {
    console.log("Connected to vehicle database successfully!");
});
vehicleDB.on('error', (err) => {
    console.error("Error connecting to vehicle database:", err);
});


//Ticketdatabase connection
const ticketDB_URL = process.env.TICKET_MONGODB_URL; // Assuming you have a separate URL for the vehicle database
const ticketDB = mongoose.createConnection(ticketDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
ticketDB.on('connected', () => {
    console.log("Connected to Ticket database successfully!");
});
ticketDB.on('error', (err) => {
    console.error("Error connecting to vehicle database:", err);
});




//const userRouter = require("./models/User.js");


const userRouter = require("./routes/users.js");
const operatorRouter = require("./routes/operators.js");
const vehicleRouter = require("./routes/vehicles.js");
const ticketRouter = require("./routes/tickets.js");








app.use("/user",userRouter);
app.use("/operator", operatorRouter);
app.use("/vehicle",vehicleRouter);
app.use("/ticket",ticketRouter);




//listen to port
app.listen(PORT,() =>{
    console.log(`server is up and running on port:${PORT}`)

})