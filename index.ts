import app from './src/server';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(3001, () => {
  console.log('listening on port 3001!');
});