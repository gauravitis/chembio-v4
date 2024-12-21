import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: "AIzaSyBUW-NLA-s3PaRp5kq2zlNuNyerG_JflGA",
  authDomain: "cblv3-c28f3.firebaseapp.com",
  projectId: "cblv3-c28f3",
  storageBucket: "cblv3-c28f3.firebasestorage.app",
  messagingSenderId: "1067609390099",
  appId: "1:1067609390099:web:9a30b562984c53cb52d3e6",
  measurementId: "G-0DBVKC2GZN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to generate a unique ID for a product
function generateUniqueProductId(product) {
  const baseId = product.id || product.ID || product['Product ID'] || product.casNumber || product['CAS Number'];
  const packSize = product.packSize || product['Pack Size'] || '';
  return `${baseId}-${packSize}`.replace(/\s+/g, '-').toLowerCase();
}

async function migrateProducts() {
  console.log('Starting migration...');
  console.log('Initializing Firebase with project:', firebaseConfig.projectId);
  
  try {
    // Read the CSV file
    const csvPath = path.join(process.cwd(), 'products.csv');
    const csvContent = fs.readFileSync(csvPath, { encoding: 'utf-8' });
    
    // Parse CSV content
    const products = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });

    console.log(`Found ${products.length} products in CSV file`);
    
    const productsRef = collection(db, 'products');
    let migratedCount = 0;
    
    for (const product of products) {
      try {
        const productData = {
          id: generateUniqueProductId(product),
          name: product.name || product.Name || product['Product Name'],
          description: product.description || product.Description || '',
          price: parseInt(product.price || product.Price || '0', 10),
          image: product.image || product.Image || '',
          casNumber: product.casNumber || product['CAS Number'] || '',
          packSize: product.packSize || product['Pack Size'] || '',
          category: product.category || product.Category || '',
          stockQuantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await addDoc(productsRef, productData);
        migratedCount++;
        console.log(`Migrated product: ${productData.name} (${productData.id})`);
      } catch (error) {
        console.error(`Error migrating product:`, error);
      }
    }
    
    console.log(`Successfully migrated ${migratedCount} products`);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Add error handling for unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Run the migration
migrateProducts();