# Shopify Color Updater

This is a minimal Shopify app that updates product variant colors on product creation based on color mappings defined in Google Sheets.

## Setup

1. Create a Google Cloud service account with Sheets API access and download the JSON key file.
2. Upload the service account JSON file to your server and set the environment variable `GOOGLE_SERVICE_ACCOUNT_PATH` to its path.
3. Set environment variables:
    - `SHOPIFY_ACCESS_TOKEN`
    - `SHOPIFY_SHOP` (e.g., yourshop.myshopify.com)
    - `SPREADSHEET_ID` (your Google Sheets ID)
4. Run `npm install`.
5. Run the app with `npm start`.
6. Register the webhook for product creation pointing to `/webhooks/products_create` endpoint.

## Deployment

This app can be deployed on any Node.js hosting service such as Render.com.

Make sure to configure environment variables correctly on your hosting platform.

---
