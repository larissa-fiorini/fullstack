const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const userRouters = require('./routes/userRoutes')
const User = require('./models/User')
const bcrypt = require('bcrypt')

dotenv.config();
const app = express();

app.use(express.json());
const allowedOrigins = [
  'https://fullstack-eol3ds6pn-larissa-fiorinis-projects.vercel.app',
  'http://localhost:5000',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Routes
app.use('/users', userRouters);
app.get('/', (req,res) => {
    res.send('Welcome to the API')
})
app.post('/login', async (req,res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ token });
})

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