import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Edit2, Trash2, Plus, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { Testimonial } from '@/lib/types'

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      toast.error('Failed to fetch testimonials')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id)

        if (error) throw error
        toast.success('Testimonial deleted')
        fetchTestimonials()
      } catch (error) {
        toast.error('Failed to delete testimonial')
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          <button className="flex items-center gap-2 btn-primary text-sm">
            <Plus size={20} />
            Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient p-6 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-secondary fill-secondary" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">({testimonial.rating}/5)</span>
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.client_name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.client_company}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary">
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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
