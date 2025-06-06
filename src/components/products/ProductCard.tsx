import { Product } from "@/types/product"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { formatPrice } from "@/lib/utils"
import { Tag } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  showSaleTag?: boolean
}

export function ProductCard({ product, showSaleTag = false }: ProductCardProps) {
  const imageUrl = product.images?.[0] || "/placeholder-product.png"
  const isOnSale = product.isOnSale && product.salePrice !== null
  const displayPrice = isOnSale ? product.salePrice : product.price

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10">
        {/* Sale Tag */}
        {showSaleTag && isOnSale && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Sale
            </div>
          </div>
        )}

        {/* Product Image */}
        <div className="aspect-square relative">
          <OptimizedImage
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">
                {formatPrice(displayPrice)}
              </p>
              {isOnSale && (
                <p className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
} 