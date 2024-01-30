import 'dotenv/config'
import express from 'express';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/orders', ordersRouter)


app.get('/', (req, res) => {
    res.send('GET request to the root')
})


app.listen(port, () => {
  console.log(`Films app listening on port ${port}`)
})