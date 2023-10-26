require('dotenv').config();



const mongoConnectionString = process.env.mongoURI;

module.exports = { mongoConnectionString };

const apiKey = process.env.API_KEY;
const dbHost = process.env.DB_HOST;

