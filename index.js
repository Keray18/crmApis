const express = require('express');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/dbConnection');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})