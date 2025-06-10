import { Product } from "@/types/product"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  showSaleTag?: boolean
}

export function ProductCard({ product, showSaleTag = false }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Clean URL function
  const cleanUrl = (url: string) => url.replace(/^\/+(https?:\/\/)/, '$1');
  
  // Get the image URL
  let imageUrl = '/images/product-placeholder.png';
  
  if (!imageError) {
    if (product.image && typeof product.image === 'string' && product.image.trim() !== '') {
      imageUrl = cleanUrl(product.image);
    } else if (product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
      imageUrl = cleanUrl(product.images[0]);
    }
  }
  
  const isOnSale = product.isOnSale && product.salePrice !== null;
  const displayPrice = isOnSale ? product.salePrice : product.price;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-accent-blue/50 transition-all duration-300">
        <div className="aspect-square relative bg-white/5">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
          {showSaleTag && isOnSale && (
            <div className="absolute top-2 right-2">
              <div className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Tag size={12} />
                <span>Sale</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-100 line-clamp-2">{product.name}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`font-medium ${isOnSale ? 'text-purple-400' : 'text-white'}`}>
              {formatPrice(displayPrice)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}