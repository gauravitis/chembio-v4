export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;  // Making this required but it can be an empty string
  casNumber?: string;
  packSize?: string;
  category: string;
  stockQuantity?: number;
  manufacturer?: string;
  tags?: string[];
  specifications?: Record<string, string>;
  relatedProducts?: string[]; // IDs of related products
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
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