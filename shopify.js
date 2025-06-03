import { Shopify } from "@shopify/shopify-api";
import fetch from "node-fetch";

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOP = process.env.SHOPIFY_SHOP; // like "yourshop.myshopify.com"

export async function updateProduct(productId, variants) {
  const url = `https://${SHOP}/admin/api/2023-04/products/${productId}.json`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      product: {
        id: productId,
        variants,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`);
  }

  return await response.json();
}
