import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Trash2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { ProjectRequest } from '@/lib/types'

export function AdminRequests() {
  const [requests, setRequests] = useState<ProjectRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('project_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRequests(data || [])
    } catch (error) {
      toast.error('Failed to fetch requests')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this request?')) {
      try {
        const { error } = await supabase
          .from('project_requests')
          .delete()
          .eq('id', id)

        if (error) throw error
        toast.success('Request deleted')
        fetchRequests()
      } catch (error) {
        toast.error('Failed to delete request')
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-white mb-8">Project Requests</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No requests yet</div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedId(selectedId === request.id ? null : request.id)}
                className={`card-gradient p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedId === request.id ? 'border-primary/50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold text-lg">{request.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'new'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        {request.email}
                      </div>
                      <div>Business: <span className="text-primary font-medium">{request.business_name}</span></div>
                      <div>Service: <span className="text-primary font-medium">{request.service}</span></div>
                      <div>Budget: <span className="text-primary font-medium">{request.budget}</span></div>
                    </div>
                    {selectedId === request.id && (
                      <p className="text-gray-300 mt-4 p-4 bg-dark/50 rounded-lg">{request.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(request.id)
                      }}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
