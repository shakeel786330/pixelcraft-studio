import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Phone, Trash2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { ContactMessage } from '@/lib/types'

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      toast.error('Failed to fetch messages')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id)

        if (error) throw error
        toast.success('Message deleted')
        fetchMessages()
      } catch (error) {
        toast.error('Failed to delete message')
      }
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const message = messages.find(m => m.id === id)
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !message?.read })
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error) {
      toast.error('Failed to update message')
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-white mb-8">Contact Messages</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No messages yet</div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedId(selectedId === message.id ? null : message.id)}
                className={`card-gradient p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedId === message.id ? 'border-primary/50' : ''
                } ${message.read ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold text-lg">{message.full_name}</h3>
                      {!message.read && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">New</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        {message.email}
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          {message.phone}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      Service: <span className="text-primary font-medium">{message.service}</span>
                    </div>
                    {selectedId === message.id && (
                      <p className="text-gray-300 mt-4 p-4 bg-dark/50 rounded-lg">{message.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary"
                      title={message.read ? 'Mark unread' : 'Mark read'}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
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
