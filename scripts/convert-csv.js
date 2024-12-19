const fs = require('fs');
const csv = require('csv-parse/sync');
const path = require('path');

// Read the CSV file
const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Please provide the CSV file path as an argument');
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(inputFile, 'utf-8');
  const records = csv.parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  // Convert the records to the correct format
  const products = records.map(record => ({
    id: String(record.id),
    name: record.name,
    description: record.description,
    category: record.category,
    price: Number(record.price),
    image: record.image.startsWith('/') ? record.image : `/${record.image}`
  }));

  // Generate the TypeScript content
  const tsContent = `export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};`;

  // Write to products.ts
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
  fs.writeFileSync(outputPath, tsContent);
  console.log('Successfully converted CSV to products.ts');

} catch (error) {
  console.error('Error converting CSV:', error.message);
  process.exit(1);
}
