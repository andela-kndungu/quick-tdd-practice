import mongoose from 'mongoose';

const dbConnect = () => {
  if (!process.env.MONGODB_URI) {
    require('dotenv').config(); // eslint-disable-line
  }

  mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;

  db.on('error', (error) => {
    console.log(error); // eslint-disable-line
  });

  db.once('open', () => {
    console.log('Successfully connected to db'); // eslint-disable-line
  });
};

export default dbConnect;

