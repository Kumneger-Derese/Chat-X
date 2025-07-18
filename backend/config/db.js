import mongoose from 'mongoose';
import { logger } from './logger.js';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.debug('Database connected successfully!');
  } catch (error) {
    logger.error('Error in connecting database.', error);
  }
};

export { connectDb };
