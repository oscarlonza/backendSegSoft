import express from 'express'
import connection from './database/db.js'
import router from './routes/main.route.js'
import cors from 'cors'
import { not_found } from './controllers/main.controller.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT

await connection()

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
     next();
 });

app.use('/api', router)

app.get('*', not_found)

app.listen(port, () => console.log(`Server on port: ${port}`))