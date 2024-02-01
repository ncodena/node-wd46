import 'dotenv/config';
import express from 'express';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
const port = 8000;

// const middlewareExample = (req, res, next) => {
//     //Perform soem action on the request or response
//     console.log({url: req.originalUrl})
//     next();
// }
// app.use(middlewareExample)
app.use(express.json());
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);


app.listen(port, () => {
  console.log(`Films app listening on port ${port}`)
})