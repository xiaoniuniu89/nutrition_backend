import app from './src/server';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});