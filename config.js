require('dotenv').config();



//mongodb+srv://younesdev97:BBNW1jWUCrncXDcz@cluster0.50qm34f.mongodb.net/
const mongoConnectionString = "mongodb+srv://younesdev97:BBNW1jWUCrncXDcz@cluster0.50qm34f.mongodb.net/";

module.exports = { mongoConnectionString };

const apiKey = process.env.API_KEY;
const dbHost = process.env.DB_HOST;

