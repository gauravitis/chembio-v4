import { Metadata } from "next"
import { SaleProductsGrid } from "@/components/sale/SaleProductsGrid"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Special Offers | Chembio Lifesciences",
  description: "Explore our special offers and discounted products. Limited time deals on selected items.",
}

export default function SpecialOffersPage() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      {/* Header Section */}
      <PageHeader 
        title="Special Offers" 
        description="Explore our exclusive deals and discounted products. Limited time offers on selected items."
      />

      {/* Content Section */}
      <section className="py-12">
        <div className="container-centered">
          <SaleProductsGrid />
        </div>
      </section>
    </main>
  )
}