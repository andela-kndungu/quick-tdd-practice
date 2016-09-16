import express from 'express';
import config from './config';

const app = express();

// Connect to the db
config.db();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line
});

