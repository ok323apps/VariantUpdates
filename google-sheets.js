import { google } from "googleapis";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;  // Set in environment variables
const BASE_COLORS = ["Green", "Blue", "Red", "Purple", "Pink", "Brown", "Yellow", "Tan", "Gray", "Black", "Orange"];

let authClient = null;

async function getAuth() {
  if (!authClient) {
    authClient = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_PATH, // Path to your service account json
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  }
  return authClient;
}

export async function getColorMapping() {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const colorMap = {};

  for (const color of BASE_COLORS) {
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${color}!A:A`,
      });
      const variants = res.data.values?.flat() || [];
      for (const variant of variants) {
        colorMap[variant.trim()] = color;
      }
    } catch (e) {
      console.error(`Error reading sheet tab ${color}:`, e.message);
    }
  }

  return colorMap;
}
