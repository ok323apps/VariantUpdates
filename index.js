import express from 'express';
import bodyParser from 'body-parser';
import { getColorMapping } from './google-sheets.js';
import { updateProductVariants } from './shopify.js';

const app = express();
app.use(bodyParser.json());

app.post('/webhooks/products_create', async (req, res) => {
  const product = req.body;
  const colorMap = await getColorMapping();

  await updateProductVariants(product, colorMap);
  res.status(200).send('Webhook received and processed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
