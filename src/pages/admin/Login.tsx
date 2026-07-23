import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function AdminLogin() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    const error = await login(email, password)
    if (error) {
      toast.error('Invalid email or password')
      console.error('Login error:', error)
    } else {
      toast.success('Login successful!')
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md px-4"
      >
        <div className="card-gradient p-8 rounded-xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">PixelCraft Studio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="admin@pixelcraft.studio"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Need admin access? Contact the site administrator.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
