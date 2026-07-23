import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { Service } from '@/lib/types'

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      toast.error('Failed to fetch services')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id)

        if (error) throw error
        toast.success('Service deleted')
        fetchServices()
      } catch (error) {
        toast.error('Failed to delete service')
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Services</h1>
          <button className="flex items-center gap-2 btn-primary text-sm">
            <Plus size={20} />
            Add Service
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient p-6 rounded-xl flex items-center justify-between"
              >
                <div>
                  <h3 className="text-white font-semibold text-lg">{service.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary">
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 size={20} />
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
