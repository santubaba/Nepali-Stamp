const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGES_DIR = path.join(__dirname, "images");
const OUTPUT_DIR = path.join(__dirname, "output");

async function uploadImage(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    folder: "nepali-stamps",
    overwrite: true,
  });
  return result.secure_url;
}

async function processCategory(categorySlug) {
  const jsonPath = path.join(OUTPUT_DIR, `${categorySlug}.json`);

  if (!fs.existsSync(jsonPath)) {
    console.log(`  Skipping ${categorySlug} — no JSON file found`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  let updated = false;

  for (const stamp of data.stamps) {
    if (!stamp.image || stamp.image === "placeholder.jpg") {
      console.log(`  Skipping ${stamp.title} — no image`);
      continue;
    }

    const imagePath = path.join(IMAGES_DIR, stamp.image);

    if (!fs.existsSync(imagePath)) {
      console.log(`  Skipping ${stamp.title} — image file not found: ${stamp.image}`);
      continue;
    }

    console.log(`  Uploading ${stamp.image}...`);
    const url = await uploadImage(imagePath, `${categorySlug}/${stamp.slug}`);
    stamp.image = url;
    updated = true;
    console.log(`  ✓ ${stamp.title} → ${url}`);
  }

  if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`  Saved updated JSON for ${categorySlug}`);
  }
}

async function main() {
  const categories = [
    "income-revenue-stamps",
    "court-fee-stamps",
    "postal-money-order",
  ];

  for (const category of categories) {
    console.log(`\nProcessing ${category}...`);
    await processCategory(category);
  }

  console.log("\nDone. All images uploaded.");
}

main().catch(console.error);