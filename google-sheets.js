import fetch from "node-fetch";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const BASE_COLORS = ["White", "Green", "Blue", "Purple", "Pink", "Brown", "Red", "Yellow", "Tan", "Gray", "Black", "Orange"];

export async function getColorMapping() {
  const colorMap = {};

  for (const color of BASE_COLORS) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${color}!A:A?key=${API_KEY}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const variants = data.values?.flat() || [];
      for (const variant of variants) {
        colorMap[variant.trim()] = color;
      }
    } catch (error) {
      console.error(`Failed to fetch sheet tab ${color}:`, error.message);
    }
  }
  return colorMap;
}
