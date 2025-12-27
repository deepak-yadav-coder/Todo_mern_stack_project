const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routers');
const cookieParser = require('cookie-parser');
const { mongoose } = require('mongoose');
const cors = require('cors')
const { verifyToken } = require('./src/middleware/jwt');
const { handleError } = require('./src/handle_response');
dotenv.config();
const app = express();

console.log('1111111111111111111  testing of git revert')
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['content-type', 'Authorization']
}))
app.use(cookieParser())
// app.use('/', verifyToken)
console.log('from db coneection')
mongoose.connect(process.env.MONGODB_URI)
    .then(working => console.log('data base connected successfully'))
    .catch(error => 'something wrong to connection with db');

console.log('222222222222222 testing of git revert')

app.use(express.json());
app.use('/api', router);

app.listen(process.env.PORT, () => console.log(`server is running on PORT ${process.env.PORT}`));