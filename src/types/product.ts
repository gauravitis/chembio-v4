export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  casNumber?: string;
  packSize?: string;
  category?: string;
  stockQuantity?: number;
} 