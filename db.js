require("dotenv").config()
const mongoose = require("mongoose")

const MongoUri = process.env.MONGO_URL

const Connectdb = async () => {
    try {
        await mongoose.connect(MongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb Connected");
    } catch (error) {
        console.error("Connection failed:", error.message);
    }
};


module.exports = Connectdb