import app from './src/server';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('listening on port 3001!');
});