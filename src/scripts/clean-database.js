const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyC1rWUQBMSFzkQqxXZDPkxYghQJ-B_sZBo",
  authDomain: "chembio-v3.firebaseapp.com",
  projectId: "chembio-v3",
  storageBucket: "chembio-v3.appspot.com",
  messagingSenderId: "1068280804171",
  appId: "1:1068280804171:web:e7b3f6a6c4c8f9c2c31e2a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function cleanDatabase() {
  try {
    console.log('Starting database cleanup...');
    
    // Sign in as admin
    console.log('Authenticating...');
    await signInWithEmailAndPassword(auth, 'admin@chembio.com', 'admin123');
    console.log('Authentication successful');
    
    // Get all products
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    console.log(`Found ${snapshot.docs.length} products to delete`);
    
    // Delete all products
    const deletePromises = snapshot.docs.map(document => 
      deleteDoc(doc(db, 'products', document.id))
        .then(() => console.log(`Deleted product: ${document.id}`))
        .catch(err => console.error(`Failed to delete ${document.id}:`, err))
    );
    
    await Promise.all(deletePromises);
    console.log('Database cleanup completed successfully!');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    process.exit(0);
  }
}

// Run the cleanup
cleanDatabase();
