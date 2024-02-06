import 'dotenv/config';
import express from 'express';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import uploadRouter from './routes/uploads.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
  console.log(`Films app listening on port ${port}`)
})