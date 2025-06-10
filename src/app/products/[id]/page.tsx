import { Metadata } from "next";
import ProductDetails from "@/components/product/ProductDetails";
import { db } from "@/lib/firebase-admin";

interface ProductPageProps {
  params: {
    id: string
  }
}

// For static export, we need to provide a list of product IDs
export async function generateStaticParams() {
  try {
    // Fetch all products from Firebase
    const snapshot = await db.collection('products').get();
    const productIds = snapshot.docs.map(doc => ({ id: doc.id }));
    
    return productIds;
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const docRef = db.collection('products').doc(params.id);
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      const product = docSnap.data();
      return {
        title: `${product?.name || 'Product'} | ChemBio Lifesciences`,
        description: product?.description || 'Product details',
      };
    }
  } catch (error) {
    console.error('Error fetching product metadata:', error);
  }
  
  return {
    title: 'Product | ChemBio Lifesciences',
    description: 'Product details',
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetails productId={params.id} />;
}