import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useContactMessages() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitMessage = async (data: {
    full_name: string
    email: string
    phone: string
    service: string
    budget: string
    message: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([{
          ...data,
          read: false,
        }])

      if (submitError) throw submitError
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit message'
      setError(message)
      console.error('Error submitting message:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { submitMessage, loading, error }
}
