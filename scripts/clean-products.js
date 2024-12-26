import { db } from '../src/lib/firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function cleanProducts() {
  try {
    console.log('Starting product cleanup...');
    
    // Get all products
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`Total products found: ${products.length}`);

    // Filter valid products (with CAS numbers)
    const validProducts = products.filter(product => 
      product.casNumber && product.casNumber.trim() !== ''
    );

    console.log(`Products with valid CAS numbers: ${validProducts.length}`);
    console.log(`Products without CAS numbers: ${products.length - validProducts.length}`);

    // Find duplicates based on CAS numbers
    const uniqueProducts = new Map();
    const duplicates = new Set();

    validProducts.forEach(product => {
      if (product.casNumber) {
        const casNumber = product.casNumber.trim();
        if (uniqueProducts.has(casNumber)) {
          duplicates.add(product.id);
        } else {
          uniqueProducts.set(casNumber, product);
        }
      }
    });

    console.log(`Unique products: ${uniqueProducts.size}`);
    console.log(`Duplicate products: ${duplicates.size}`);

    // Products to delete (duplicates + invalid CAS numbers)
    const productsToDelete = products.filter(product => 
      !product.casNumber || 
      product.casNumber.trim() === '' || 
      duplicates.has(product.id)
    );

    console.log('\nProducts to be deleted:');
    productsToDelete.forEach(product => {
      console.log(`- ${product.name} (ID: ${product.id}, CAS: ${product.casNumber || 'No CAS'})`);
    });

    // Confirm before deletion
    console.log(`\nTotal products to delete: ${productsToDelete.length}`);
    console.log('To delete these products, uncomment the deletion code below.');

    // Uncomment the following code to perform the deletion
    /*
    for (const product of productsToDelete) {
      await deleteDoc(doc(db, 'products', product.id));
      console.log(`Deleted product: ${product.name} (${product.id})`);
    }
    console.log('Cleanup completed successfully!');
    */

  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Run the cleanup
cleanProducts();
