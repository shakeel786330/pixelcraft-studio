import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useProjectRequests() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitRequest = async (data: {
    name: string
    email: string
    country: string
    business_name: string
    service: string
    budget: string
    deadline: string
    description: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      const { error: submitError } = await supabase
        .from('project_requests')
        .insert([{
          ...data,
          status: 'new',
          read: false,
        }])

      if (submitError) throw submitError
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit request'
      setError(message)
      console.error('Error submitting request:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { submitRequest, loading, error }
}
