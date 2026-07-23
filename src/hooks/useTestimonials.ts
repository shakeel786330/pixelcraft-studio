import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/lib/types'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
      console.error('Error fetching testimonials:', err)
    } finally {
      setLoading(false)
    }
  }

  return { testimonials, loading, error, refetch: fetchTestimonials }
}
