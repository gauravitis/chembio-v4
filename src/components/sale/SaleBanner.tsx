import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Tag } from "lucide-react"

export function SaleBanner() {
  return (
    <Link href="/special-offers">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="relative container px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Tag className="h-8 w-8 animate-bounce" />
              <div>
                <h3 className="text-2xl font-bold">Special Offer Sale!</h3>
                <p className="mt-1 text-white/90">Limited time discounts on selected products</p>
              </div>
            </div>
            <motion.div
              className="flex items-center mt-4 sm:mt-0"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="font-medium">Shop Now</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </motion.div>
    </Link>
  )
} 