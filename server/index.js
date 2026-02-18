import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config(); // Load .env variables

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Mongo Connected Successfully");
    console.log("Database:", mongoose.connection.name);
    app.listen(PORT, () =>
      console.log(`Server Running on Port: ${PORT}`)
    );
  })
  .catch((error) => console.log('Mongo connection error:', error));

mongoose.set('useFindAndModify', false);
