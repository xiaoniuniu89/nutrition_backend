import * as dotenv from 'dotenv';
dotenv.config();
import app from './src/server';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});