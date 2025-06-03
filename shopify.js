import fetch from 'node-fetch';

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOP = process.env.SHOPIFY_SHOP;

export async function updateProductVariants(product, colorMap) {
  const productId = product.id;
  const updatedVariants = product.variants.map((variant) => {
    const originalColor = variant.option1;
    const mappedColor = colorMap[originalColor] || originalColor;
    return {
      id: variant.id,
      option1: mappedColor,
    };
  });

  const res = await fetch(`https://${SHOP}/admin/api/2023-04/products/${productId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      product: {
        id: productId,
        variants: updatedVariants,
      },
    }),
  });

  if (!res.ok) {
    console.error(`Failed to update product: ${res.statusText}`);
  } else {
    console.log(`Product ${productId} updated successfully.`);
  }
}
