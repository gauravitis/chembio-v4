const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBUW-NLA-s3PaRp5kq2zlNuNyerG_JflGA",
  authDomain: "cblv3-c28f3.firebaseapp.com",
  projectId: "cblv3-c28f3",
  storageBucket: "cblv3-c28f3.firebasestorage.app",
  messagingSenderId: "1067609390099",
  appId: "1:1067609390099:web:9a30b562984c53cb52d3e6",
  measurementId: "G-0DBVKC2GZN"
};

// Sample products data (since we can't import from ES modules)
const products = [
  {
    "id": "270458-1L",
    "name": "1-Methyl-2-pyrrolidinone CHROMASOLV™ Plus, for HPLC, ≥99%",
    "description": "1-Methyl-2-pyrrolidone; N-Methyl-2-pyrrolidone; NMP",
    "price": 10899,
    "image": "https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/8/d/8dff797f7b8151e571e80c683d5d3db2a0275e0f4d68445f4cb68187f0ee0b8c.jpeg"
  },
  {
    "id": "34856-2.5L",
    "name": "Dichloromethane CHROMASOLV™, for HPLC, ≥99.8%",
    "description": "Methylene chloride",
    "price": 8260,
    "image": "https://lab.honeywell.com/shop/media/catalog/product/cache/ae13028c52290a7248189008ed57c9bd/9/7/97396f625fd0897ac7566fc410ee29722c7d98a6601fe7dd6959ba39b26e449d.jpeg"
  }
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateProducts() {
  console.log('Starting migration...');
  console.log('Initializing Firebase with project:', firebaseConfig.projectId);
  
  try {
    const productsRef = collection(db, 'products');
    let migratedCount = 0;
    
    for (const product of products) {
      try {
        const productData = {
          ...product,
          stockQuantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await addDoc(productsRef, productData);
        console.log(`✓ Migrated: ${product.name}`);
        migratedCount++;
      } catch (error) {
        console.error(`Failed to migrate product ${product.name}:`, error);
      }
    }

    console.log(`Migration completed! Successfully migrated ${migratedCount} products.`);
    process.exit(0);
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

migrateProducts(); 