const mongoose = require('mongoose');
const { MONGO_URI } = require('./index');    

const opts = {
  maxPoolSize: 10,            
  serverSelectionTimeoutMS: 30_000,  
};

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, opts);
    console.log('MongoDB connected');
  } catch (err) {
    console.error({ err }, 'MongoDB connection error');
    process.exit(1);
  }

  mongoose.connection.on('error', err => {
    console.error({ err }, 'Mongoose runtime error');
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected; attempting reconnect');
  });

  ['SIGINT', 'SIGTERM'].forEach(sig =>
    process.on(sig, async () => {
      console.info(`Signal ${sig} received: closing MongoDB connection`);
      await mongoose.connection.close();
      console.info('MongoDB connection closed');
      process.exit(0);
    })
  );
}

module.exports = connectDB;
