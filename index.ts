import 'dotenv/config'
import express from 'express';
import { trelloService } from './src/services/TrelloService';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    await trelloService.handleWebhook(req.body);
    res.status(200).send();
  } catch (error: any) {
    console.error(`Error handling webhook: ${error.message}`);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Webhook endpoint listening at http://localhost:${port}`);
});
