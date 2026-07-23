import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useContactMessages } from '@/hooks'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function Contact() {
  const { submitMessage, loading, error } = useContactMessages()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service: 'web-development',
    budget: 'under-1000',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.full_name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    const success = await submitMessage(formData)
    if (success) {
      toast.success('Thank you! We\'ll get back to you soon.')
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        service: 'web-development',
        budget: 'under-1000',
        message: '',
      })
    } else {
      toast.error(error || 'Failed to send message')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-400">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-400">hello@pixelcraft.studio</p>
                  <p className="text-gray-400 text-sm mt-1">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm mt-1">Monday to Friday, 9am to 6pm</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-gray-400">San Francisco, CA</p>
                  <p className="text-gray-400 text-sm mt-1">Available for remote work worldwide</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 card-gradient p-8 rounded-xl space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Service Interested
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="wordpress">WordPress</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="branding">Branding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white focus:outline-none focus:border-primary"
                >
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-plus">$10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  )
}
