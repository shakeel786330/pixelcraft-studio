import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { PricingPackage } from '@/lib/types'

export function usePricingPackages() {
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch packages')
      console.error('Error fetching packages:', err)
    } finally {
      setLoading(false)
    }
  }

  return { packages, loading, error, refetch: fetchPackages }
}
