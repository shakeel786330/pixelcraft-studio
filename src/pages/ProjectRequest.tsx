import { useState } from 'react'
import { useProjectRequests } from '@/hooks'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function ProjectRequest() {
  const { submitRequest, loading, error } = useProjectRequests()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    business_name: '',
    service: 'web-development',
    budget: '1000-5000',
    deadline: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.business_name || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    const success = await submitRequest(formData)
    if (success) {
      toast.success('Project request submitted! We\'ll review and get back to you soon.')
      setFormData({
        name: '',
        email: '',
        country: '',
        business_name: '',
        service: 'web-development',
        budget: '1000-5000',
        deadline: '',
        description: '',
      })
    } else {
      toast.error(error || 'Failed to submit request')
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
              Start Your <span className="text-gradient">Project</span>
            </h1>
            <p className="text-xl text-gray-400">
              Tell us about your project idea, and we'll get back to you with a customized proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto card-gradient p-8 rounded-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="Your country"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="Your business name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Service Needed *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="wordpress">WordPress Development</option>
                    <option value="ecommerce">E-commerce Development</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="branding">Branding & Logo</option>
                    <option value="social-media">Social Media Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-plus">$10,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Project Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  placeholder="Describe your project in detail. What are your goals? Who is your target audience? What makes your project unique?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Project Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
