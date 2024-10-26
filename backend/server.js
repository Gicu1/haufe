const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const testRoute = require('./routes/testRoute');
app.use('/api', testRoute);

const authRoute = require('./routes/auth.routes');
app.use('/api/auth', authRoute);

const partyRoute = require('./routes/party.routes');
app.use('/api/parties', partyRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});

