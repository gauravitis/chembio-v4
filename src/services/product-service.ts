import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Product } from '@/types/product';

export class ProductService {
  private static COLLECTION_NAME = 'products';

  /**
   * Validates a product before saving
   */
  private static validateProduct(product: Partial<Product>): string | null {
    if (!product.name?.trim()) {
      return 'Product name is required';
    }
    // CAS number is only required for chemicals
    if (product.category === 'Chemicals' && !product.casNumber?.trim()) {
      return 'CAS number is required for chemical products';
    }
    // If CAS number is provided, validate its format (allow 'mixture')
    if (product.casNumber) {
      const casNumber = product.casNumber.trim();
      if (casNumber.toLowerCase() !== 'mixture' && 
          !/^\d{1,7}-\d{2}-\d{1}$/.test(casNumber)) {
        return 'Invalid CAS number format. Use either a valid CAS number or "mixture"';
      }
    }
    if (!product.catalogueId?.trim()) {
      return 'Catalogue ID is required';
    }
    if (!product.packSize?.trim()) {
      return 'Pack size is required';
    }
    // HSN code is optional, but validate format if provided
    if (product.hsnCode && !/^\d{4,8}$/.test(product.hsnCode.trim())) {
      return 'If provided, HSN code must be 4-8 digits';
    }
    if (!product.make?.trim()) {
      return 'Make/Brand is required';
    }
    if (!product.category?.trim()) {
      return 'Category is required';
    }
    if (typeof product.price !== 'number' || product.price < 0) {
      return 'Valid price is required';
    }
    return null;
  }

  /**
   * Formats a product before saving to ensure consistent data
   */
  private static formatProduct(product: Partial<Product>): Partial<Product> {
    const casNumber = product.casNumber?.trim();
    return {
      ...product,
      name: product.name?.trim(),
      casNumber: casNumber ? 
        (casNumber.toLowerCase() === 'mixture' ? 'Mixture' : casNumber.toUpperCase()) 
        : null,
      catalogueId: product.catalogueId?.trim().toUpperCase(),
      packSize: product.packSize?.trim(),
      hsnCode: product.hsnCode?.trim() || null,
      make: product.make?.trim(),
      category: product.category?.trim(),
      price: Number(product.price) || 0,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Creates or updates a product
   */
  static async saveProduct(product: Partial<Product>): Promise<Product> {
    // Validate product
    const validationError = this.validateProduct(product);
    if (validationError) {
      throw new Error(validationError);
    }

    // Format product data
    const formattedProduct = this.formatProduct(product);

    // Check for existing product with same Catalogue ID
    const existingCatalogueProduct = await this.findByCatalogueId(formattedProduct.catalogueId!);
    
    try {
      let productId = product.id;
      
      if (!productId) {
        // If no ID provided, create new product
        const docRef = doc(collection(db, this.COLLECTION_NAME));
        productId = docRef.id;
      }

      // If updating and Catalogue ID exists but belongs to different product
      if (existingCatalogueProduct && existingCatalogueProduct.id !== productId) {
        throw new Error('A product with this Catalogue ID already exists');
      }

      const productToSave = {
        ...formattedProduct,
        id: productId,
        createdAt: product.createdAt || new Date().toISOString(),
      };

      await setDoc(doc(db, this.COLLECTION_NAME, productId), productToSave);
      return productToSave as Product;
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  /**
   * Retrieves a product by ID
   */
  static async getProduct(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as Product) : null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  /**
   * Finds a product by CAS number and pack size
   */
  static async findByCasNumberAndPackSize(casNumber: string, packSize: string): Promise<Product | null> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('casNumber', '==', casNumber.trim().toUpperCase()),
        where('packSize', '==', packSize.trim()),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty ? null : (querySnapshot.docs[0].data() as Product);
    } catch (error) {
      console.error('Error finding product by CAS number and pack size:', error);
      throw error;
    }
  }

  /**
   * Finds a product by Catalogue ID
   */
  static async findByCatalogueId(catalogueId: string): Promise<Product | null> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('catalogueId', '==', catalogueId.trim().toUpperCase()),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty ? null : (querySnapshot.docs[0].data() as Product);
    } catch (error) {
      console.error('Error finding product by Catalogue ID:', error);
      throw error;
    }
  }

  /**
   * Gets all products with the same CAS number
   */
  static async getProductsByCasNumber(casNumber: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('casNumber', '==', casNumber.trim().toUpperCase()),
        orderBy('packSize')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Product);
    } catch (error) {
      console.error('Error getting products by CAS number:', error);
      throw error;
    }
  }

  /**
   * Retrieves all products with pagination
   */
  static async getProducts(pageSize: number = 12, lastDoc?: QueryDocumentSnapshot<DocumentData>) {
    try {
      let q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('name'),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      return {
        products,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === pageSize
      };
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  /**
   * Deletes a product
   */
  static async deleteProduct(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
