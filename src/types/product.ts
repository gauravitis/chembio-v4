export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number | null;  // Updated to allow null values
  isOnSale?: boolean;  // Flag to indicate if the product is on sale
  category: string;
  subcategory?: string;
  brand?: string;
  sku: string;
  stock: number;
  images: string[];
  specifications?: Record<string, string>;
  features?: string[];
  documents?: {
    name: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
  casNumber?: string | undefined;
  catalogueId: string;
  hsnCode?: string | undefined;
  make: string;
  mrp?: number | undefined;
  purity?: string | undefined;
  image: string;
  stockQuantity?: number | undefined;
  manufacturer?: string | undefined;
  tags?: string[] | undefined;
  relatedProducts?: string[] | undefined; // IDs of related products
  rating?: number | undefined;
  reviewCount?: number | undefined;
  packSize: string;  // Added packSize property
}

export interface ProductFilter {
  priceRange?: {
    min: number;
    max: number;
  };
  categories?: string[];
  manufacturers?: string[];
  inStock?: boolean;
  sortBy?: 'price' | 'name' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  productId: string;
  userId: string;
  addedAt: Date;
}

export interface RecentlyViewedItem {
  productId: string;
  userId: string;
  viewedAt: Date;
}

export interface ProductRecommendation {
  productId: string;
  recommendedProducts: string[];
  score: number;
  type: 'similar' | 'complementary' | 'frequently-bought-together';
}

// Analytics types
export interface ProductAnalytics {
  productId: string;
  views: number;
  addedToCart: number;
  purchased: number;
  wishlistAdds: number;
  averageRating: number;
  reviewCount: number;
  conversionRate: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: Date;
}

// Validation schema for the product
export const productValidationSchema = {
  name: {
    required: 'Product name is required',
    minLength: { value: 3, message: 'Name must be at least 3 characters' }
  },
  casNumber: {
    required: false,
    validate: (value: string) => {
      if (!value) return true;
      if (value.toLowerCase() === 'mixture') return true;
      return /^\d{1,7}-\d{2}-\d{1}$/.test(value) || 'Invalid CAS number format';
    }
  },
  catalogueId: {
    required: 'Catalogue ID is required'
  },
  packSize: {
    required: 'Pack size is required'
  },
  hsnCode: {
    required: false,
    pattern: {
      value: /^\d{4,8}$/,
      message: 'If provided, HSN code must be 4-8 digits'
    }
  },
  make: {
    required: 'Make/Brand is required'
  },
  category: {
    required: 'Category is required'
  },
  price: {
    required: 'Price is required',
    min: { value: 0, message: 'Price must be greater than 0' }
  }
};