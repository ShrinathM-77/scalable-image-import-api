import { google } from "googleapis";

const drive = google.drive({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY
});

/**
 * Extract folder ID from Google Drive URL
 */
export function extractFolderId(url) {
  const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (!match) {
    throw new Error("Invalid Google Drive folder URL");
  }
  return match[1];
}

/**
 * Fetch all images from a public folder
 */
export async function fetchImagesFromFolder(folderId) {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/'`,
    fields: "files(id, name, size, mimeType)",
    pageSize: 1000
  });

  return response.data.files;
}
