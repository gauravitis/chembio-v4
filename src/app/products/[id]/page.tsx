import { Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/lib/firebase-admin"
import { Product } from "@/types/product"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { formatPrice } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found | Chembio Lifesciences',
    }
  }

  return {
    title: `${product.name} | Chembio Lifesciences`,
    description: product.description,
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const doc = await db.collection('products').doc(id).get()
    
    if (!doc.exists) {
      return null
    }

    return {
      id: doc.id,
      ...doc.data()
    } as Product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  // Use the image field if available, otherwise fallback to images array
  const imageUrl = product.image || product.images?.[0]
  const isOnSale = product.isOnSale && product.salePrice !== null
  const displayPrice = isOnSale ? product.salePrice : product.price

  return (
    <main className="min-h-screen bg-gradient-custom">
      <PageHeader 
        title={product.name}
        description={product.description}
      />

      <section className="py-12">
        <div className="container-centered">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {imageUrl && isValidImageUrl(imageUrl) ? (
                <OptimizedImage
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <PlaceholderImage className="absolute inset-0" />
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-300">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-white">
                    {formatPrice(displayPrice || 0)}
                  </p>
                  {isOnSale && (
                    <p className="text-lg text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
                {isOnSale && (
                  <p className="text-sm text-purple-400">
                    Special offer available!
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <button className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Contact Sales
                </button>
              </div>

              {/* Additional Product Information */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Product Details
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                      <div>
                        <p className="font-medium">Specifications:</p>
                        <div className="mt-2 space-y-1">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <p key={key} className="text-sm">
                              <span className="font-medium">{key}:</span> {value}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.catalogueId && (
                      <div>
                        <p className="font-medium">Catalog Number:</p>
                        <p>{product.catalogueId}</p>
                      </div>
                    )}
                    {product.manufacturer && (
                      <div>
                        <p className="font-medium">Manufacturer:</p>
                        <p>{product.manufacturer}</p>
                      </div>
                    )}
                    {product.casNumber && (
                      <div>
                        <p className="font-medium">CAS Number:</p>
                        <p>{product.casNumber}</p>
                      </div>
                    )}
                    {product.purity && (
                      <div>
                        <p className="font-medium">Purity:</p>
                        <p>{product.purity}</p>
                      </div>
                    )}
                    {product.make && (
                      <div>
                        <p className="font-medium">Make:</p>
                        <p>{product.make}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 