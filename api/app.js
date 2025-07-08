const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouters = require('./routes/userRoutes')

dotenv.config();
const app = express();

app.use(express.json());

//Routes
app.use('/api/users', userRouters);

//DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})