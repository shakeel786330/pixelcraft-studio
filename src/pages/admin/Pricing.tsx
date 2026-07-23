import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { PricingPackage } from '@/lib/types'

export function AdminPricing() {
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pricing_packages')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error
      setPackages(data || [])
    } catch (error) {
      toast.error('Failed to fetch packages')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        const { error } = await supabase
          .from('pricing_packages')
          .delete()
          .eq('id', id)

        if (error) throw error
        toast.success('Package deleted')
        fetchPackages()
      } catch (error) {
        toast.error('Failed to delete package')
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Pricing Packages</h1>
          <button className="flex items-center gap-2 btn-primary text-sm">
            <Plus size={20} />
            Add Package
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient p-6 rounded-xl"
              >
                <h3 className="text-white font-semibold text-lg">{pkg.name}</h3>
                <p className="text-3xl font-bold text-primary mt-2">${pkg.price}</p>
                <p className="text-gray-400 text-sm mt-2">{pkg.description}</p>
                <ul className="space-y-2 mt-4 mb-6">
                  {pkg.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <button className="flex-1 p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary">
                    <Edit2 size={18} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="flex-1 p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 size={18} className="mx-auto" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
