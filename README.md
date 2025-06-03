# Shopify Color Updater

A Shopify app that listens for product creation webhooks and updates variant colors using a Google Sheet.

## Setup

1. Set environment variables:
   - `SHOPIFY_ACCESS_TOKEN=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`
   - `SHOPIFY_SHOP=ae6789-2.myshopify.com`
   - `GOOGLE_SHEETS_API_KEY=your_google_api_key`
   - `SPREADSHEET_ID=your_google_sheet_id`

2. Deploy this on Render or your Node.js host.

3. Create a webhook in Shopify for `products/create` pointing to `/webhooks/products_create`.
