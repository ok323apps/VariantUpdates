import express from "express";
import bodyParser from "body-parser";
import { getColorMapping } from "./google-sheets.js";
import { updateProduct } from "./shopify.js";

const app = express();
app.use(bodyParser.json());

const KEEP_COLORS = ["White", "Green", "Blue", "Purple", "Pink", "Brown", "Red", "Yellow", "Tan", "Gray", "Black", "Orange"];

app.post("/webhooks/products_create", async (req, res) => {
  try {
    const product = req.body;
    const colorMap = await getColorMapping();

    let updated = false;

    product.variants.forEach(variant => {
      for (let i = 1; i <= 3; i++) {
        const optionKey = `option${i}`;
        const optionValue = variant[optionKey];
        if (optionValue && !KEEP_COLORS.includes(optionValue)) {
          if (colorMap[optionValue]) {
            variant[optionKey] = colorMap[optionValue];
            updated = true;
          }
        }
      }
    });

    if (updated) {
      await updateProduct(product.id, product.variants);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
