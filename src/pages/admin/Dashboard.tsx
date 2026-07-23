import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { BarChart, FileText, Package, MessageSquare, Zap, Users, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

interface Stats {
  projects: number
  services: number
  messages: number
  requests: number
  testimonials: number
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    services: 0,
    messages: 0,
    requests: 0,
    testimonials: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projects, services, messages, requests, testimonials] = await Promise.all([
        supabase.from('portfolio_projects').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('project_requests').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
      ])

      setStats({
        projects: projects.count || 0,
        services: services.count || 0,
        messages: messages.count || 0,
        requests: requests.count || 0,
        testimonials: testimonials.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: BarChart },
    { label: 'Portfolio', href: '/admin/portfolio', icon: FileText },
    { label: 'Services', href: '/admin/services', icon: Zap },
    { label: 'Pricing', href: '/admin/pricing', icon: Package },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Users },
    { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { label: 'Requests', href: '/admin/requests', icon: FileText },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back to PixelCraft Studio</p>
          </motion.div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            { label: 'Portfolio Projects', value: stats.projects, icon: FileText },
            { label: 'Services', value: stats.services, icon: Zap },
            { label: 'Contact Messages', value: stats.messages, icon: MessageSquare },
            { label: 'Project Requests', value: stats.requests, icon: FileText },
            { label: 'Testimonials', value: stats.testimonials, icon: Users },
          ].map((stat, i) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-gradient p-6 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <IconComponent size={20} className="text-primary" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="card-gradient p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent size={20} className="text-primary" />
                    </div>
                    <span className="text-white font-semibold group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
