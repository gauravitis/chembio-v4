import { db } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function cleanDatabase() {
  try {
    console.log('Starting database cleanup...');
    
    // Get all products
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    console.log(`Found ${snapshot.docs.length} products to delete`);
    
    // Delete all products
    for (const document of snapshot.docs) {
      await deleteDoc(doc(db, 'products', document.id));
      console.log(`Deleted product: ${document.id}`);
    }
    
    console.log('Database cleanup completed successfully!');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Run the cleanup
cleanDatabase();
